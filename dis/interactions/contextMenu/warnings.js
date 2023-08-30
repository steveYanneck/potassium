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
const datastore = require("./../../modules/data/main.js");
module.exports = {
    construct: {
        name: "warnings",
        type: discord_js_1.ApplicationCommandType.User
    },
    execute(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = interaction.targetUser;
            //@ts-ignore
            const userData = yield datastore.fetch(member.id);
            const warnings = userData.warnings;
            if (warnings.length === 0) {
                //@ts-ignore
                interaction.reply({ content: `<@${member.id}> doesnt have any warnings`, ephemeral: true });
                return;
            }
            let fields = [];
            for (const warning of warnings) {
                if (warning.expired === false) {
                    const field = {
                        name: `${warning.id}`,
                        value: `reason: ${warning.reason}\nexpires: <t:${Math.round(warning.expires / 1000)}>\nmoderator:<@${warning.moderator}>`
                    };
                    fields.push(field);
                }
                else {
                    const field = {
                        name: `~~${warning.id}~~`,
                        value: `~~reason: ${warning.reason}\nexpires: <t:${Math.round(warning.expires / 1000)}>\nmoderator:<@${warning.moderator}>~~`
                    };
                    fields.push(field);
                }
            }
            const embed = new discord_js_1.EmbedBuilder()
                .addFields(fields)
                .setColor("#bbff00")
                //@ts-ignore
                .setTitle(`${member.tag}'s warnings:`)
                .setFooter({ text: `${warnings.length} warnings in total found` });
            interaction.reply({ embeds: [embed], ephemeral: true });
        });
    }
};
