"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CronJob = require('cron').CronJob;
const datastore = require("./../modules/data/main.js");
const manifest = require("./../../config/manifest.json");
module.exports = {
    name: "ready",
    execute(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = new CronJob('0 * * * *', () => __awaiter(this, void 0, void 0, function* () {
                console.log("Running cronjob");
                const userData = yield datastore.fetchAllData();
                for (const data of userData) {
                    let changes = false;
                    const timestamp = data.userData.firstJoined;
                    const oneWeekMembership = timestamp + 604800000;
                    let rawMemberData = yield datastore.fetch(data.user_id);
                    if (data.userData.regularMember === false) {
                        if (Date.now() >= oneWeekMembership) { //checks if new member has been in the server for a week and gives them the "regular member" role. To ignore this check just remove the whole if statement.
                            try {
                                const member = yield (yield client.guilds.fetch(manifest.guild)).members.fetch(data.user_id);
                                if (!member.roles.cache.has("1028596599162683464"))
                                    continue;
                                changes = true;
                                rawMemberData.regularMember = true;
                                yield member.roles.add([manifest.regularMemberRole]);
                                yield member.roles.remove([manifest.newMemberRole]);
                                const embed = new discord_js_1.EmbedBuilder()
                                    .setTitle("REGULAR MEMBER")
                                    .setDescription(`Hello ${member.user.tag},\n\nIt looks like you have been a member in PAW Patrol Fanatics for a week now. For that we have given you the regular member role. With this role you can now add attachments to your messages and the automod will be less strict now.\n\nRegards\nFanatics Staff Team`)
                                    .setColor("#42f551");
                                try {
                                    member.send({ embeds: [embed] });
                                }
                                catch (_a) {
                                }
                                console.log(`Updated roles for ${member.user.tag}`);
                            }
                            catch (err) {
                                console.log(`Could not process user wit the following error:\n\n${err}`);
                            }
                        }
                    }
                    if (rawMemberData.warnings.length >= 1) { //checks if a warning has exceeded its expiration date
                        changes = true;
                        rawMemberData.warnings.map((warning) => {
                            if (warning.expires <= Date.now()) {
                                warning.expired = true;
                            }
                            return warning;
                        });
                    }
                    if (changes === true) { //pushes the changes to the database
                        yield datastore.update(data.user_id, rawMemberData);
                    }
                }
            }));
            checkUser.start();
        });
    }
};
