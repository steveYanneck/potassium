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
const manifest = require("./../../../config/manifest.json");
module.exports = {
    name: "appeal",
    execute(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = interaction.member;
            //@ts-ignore
            let banned = false;
            //@ts-ignore
            yield (yield client.guilds.fetch(manifest.guild)).bans.fetch(member.id)
                .then((ban) => {
                console.log(ban);
                banned = true;
            })
                .catch(() => {
                interaction.reply({ content: "You dont seem to be banned from the server", ephemeral: true });
            });
            if (banned === false)
                return;
            const modal = new discord_js_1.ModalBuilder()
                .setCustomId("appealModal")
                .addComponents(
            //@ts-ignore
            new discord_js_1.ActionRowBuilder().addComponents(
            //@ts-ignore
            new discord_js_1.TextInputBuilder()
                .setCustomId("reason")
                .setLabel("For what reason did you get banned for?")
                .setRequired(true)
                .setStyle(discord_js_1.TextInputStyle.Paragraph)), 
            //@ts-ignore
            new discord_js_1.ActionRowBuilder().addComponents(
            //@ts-ignore
            new discord_js_1.TextInputBuilder()
                .setCustomId("why-unjustified")
                .setLabel("Why do you think your ban in not justified?")
                .setRequired(true)
                .setStyle(discord_js_1.TextInputStyle.Paragraph)))
                .setTitle("APPEAL REQUEST");
            yield interaction.showModal(modal);
            //@ts-ignore
            const filter = (i) => i.customId === "appealModal" && i.member.id === interaction.member.id;
            interaction.awaitModalSubmit({ filter, time: 300000 })
                .then((modalInteraction) => __awaiter(this, void 0, void 0, function* () {
                const embed = new discord_js_1.EmbedBuilder()
                    .setColor("#00ffff")
                    .setTitle("Appeal Request")
                    .addFields([
                    {
                        name: "Username",
                        //@ts-ignore
                        value: member === null || member === void 0 ? void 0 : member.user.tag,
                        inline: true
                    },
                    {
                        name: "ID",
                        //@ts-ignore
                        value: member.id,
                        inline: true
                    },
                    {
                        name: "Status",
                        value: "Open",
                        inline: false
                    },
                    {
                        name: "Why did you get banned?",
                        value: modalInteraction.fields.getTextInputValue("reason"),
                        inline: false
                    },
                    {
                        name: "why do you think the ban is not justified?",
                        value: modalInteraction.fields.getTextInputValue("why-unjustified"),
                        inline: false
                    }
                ]);
                const buttons = new discord_js_1.ActionRowBuilder().addComponents(
                //@ts-ignore
                new discord_js_1.ButtonBuilder()
                    .setCustomId("appeal-deny")
                    .setLabel("REJECT")
                    .setStyle(discord_js_1.ButtonStyle.Danger), 
                //@ts-ignore
                new discord_js_1.ButtonBuilder()
                    .setCustomId("appeal-accept")
                    .setLabel("ACCEPT")
                    .setStyle(discord_js_1.ButtonStyle.Success));
                const channel = yield client.channels.fetch(manifest.appealChannel);
                //@ts-ignore
                channel.send({ embeds: [embed], components: [buttons] })
                    .then((message) => __awaiter(this, void 0, void 0, function* () {
                    //@ts-ignore
                    message.startThread({ name: member === null || member === void 0 ? void 0 : member.user.username });
                    modalInteraction.reply({ content: "Succesfully sent your appeal request", ephemeral: true });
                }));
            }))
                .catch(() => {
                return;
            });
        });
    }
};
