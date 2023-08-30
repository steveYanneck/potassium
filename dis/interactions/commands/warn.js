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
const expirationDate = {
    minor: 2592000000,
    normal: 7776000000,
    mayor: 999999999999000,
};
const datastore = require("./../../modules/data/main.js");
module.exports = {
    guild: true,
    construct: {
        name: "warn",
        description: "warns a user for an offense",
        options: [
            {
                type: discord_js_1.ApplicationCommandOptionType.User,
                name: "user",
                description: "the user you want to assign the warning to",
                required: true
            },
            {
                type: discord_js_1.ApplicationCommandOptionType.String,
                name: "reason",
                description: "the reason of the warning",
                required: true
            },
            {
                type: discord_js_1.ApplicationCommandOptionType.String,
                name: "severity",
                description: "how severe the offense",
                choices: [
                    {
                        name: "minor",
                        value: "minor"
                    },
                    {
                        name: "normal",
                        value: "normal"
                    },
                    {
                        name: "mayor",
                        value: "mayor"
                    }
                ],
                required: true
            }
        ]
    },
    execute(client, interaction) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const member = interaction.options.getMember("user");
            const reason = (_a = interaction.options.get("reason")) === null || _a === void 0 ? void 0 : _a.value;
            const severity = (_b = interaction.options.get("severity")) === null || _b === void 0 ? void 0 : _b.value;
            if (severity != "minor" && severity != "normal" && severity != "mayor") {
                interaction.reply({ content: "Severity type is invalid!", ephemeral: true });
                return;
            }
            yield interaction.deferReply();
            //@ts-ignore
            let userData = yield datastore.fetch(member.id);
            let warnings = userData.warnings;
            console.log(warnings);
            console.log(userData);
            const newWarning = {
                reason: reason,
                moderator: (_c = interaction.member) === null || _c === void 0 ? void 0 : _c.user.id,
                issued: Date.now(),
                //@ts-ignore
                expires: Date.now() + expirationDate[severity],
                expired: false,
                severity: severity,
                id: Date.now().toString()
            };
            warnings.push(newWarning);
            userData.warnings = warnings;
            console.log(userData);
            //@ts-ignore
            datastore.update(member.id, userData);
            let success;
            try {
                const embed = new discord_js_1.EmbedBuilder()
                    .setTitle("WARNING")
                    .setDescription(`Our moderators have issued a ${severity} warning on your account for violating our server rules!`)
                    //@ts-ignore
                    .addFields([
                    {
                        name: "moderator",
                        //@ts-ignore
                        value: `<@${member.id}>`,
                        inline: true
                    },
                    {
                        name: "severity",
                        value: severity,
                        inline: true
                    },
                    {
                        name: "reason",
                        value: reason
                    }
                ])
                    .setColor("#fcd303");
                //@ts-ignore
                member.user.send({ embeds: [embed] });
                success = true;
            }
            catch (_d) {
                success = false;
            }
            if (success === true) {
                const embed = new discord_js_1.EmbedBuilder()
                    .setTitle("WARNING ISSUED")
                    //@ts-ignore
                    .setDescription(`A warning has successfully been issued to <@${member.id}>`)
                    //@ts-ignore
                    .addFields([
                    {
                        name: "moderator",
                        //@ts-ignore
                        value: `<@${member.id}>`,
                        inline: true
                    },
                    {
                        name: "severity",
                        value: severity,
                        inline: true
                    },
                    {
                        name: "reason",
                        value: reason
                    },
                    {
                        name: "expires",
                        value: `<t:${Math.round(newWarning.expires / 1000)}>`
                    }
                ])
                    .setColor("#1bb500");
                interaction.editReply({ embeds: [embed] });
            }
            else {
                const embed = new discord_js_1.EmbedBuilder()
                    .setTitle("WARNING ISSUED")
                    //@ts-ignore
                    .setDescription(`A warning has successfully been issued to <@${member.id}> but i couldnt dm them`)
                    //@ts-ignore
                    .addFields([
                    {
                        name: "moderator",
                        //@ts-ignore
                        value: `<@${member.id}>`,
                        inline: true
                    },
                    {
                        name: "severity",
                        value: severity,
                        inline: true
                    },
                    {
                        name: "reason",
                        value: reason
                    },
                    {
                        name: "expires",
                        value: `<t:${Math.round(newWarning.expires / 1000)}>`
                    }
                ])
                    .setColor("#1bb500");
                interaction.editReply({ embeds: [embed] });
            }
        });
    }
};
