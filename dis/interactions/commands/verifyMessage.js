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
module.exports = {
    construct: {
        name: "verifymessage",
        description: "posts the verify message"
    },
    execute(client, interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle("VERIFICATION")
                .setDescription("Press the button below to gain access to the server. Please do note that new members will have less permissions compared to a regular member. This is just meant as a safety barrier and lifts automatically after a certain amount of time.")
                .setColor("#0051ff");
            const row = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setCustomId("verify")
                .setLabel("VERIFY")
                .setStyle(discord_js_1.ButtonStyle.Primary));
            (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send({ embeds: [embed], components: [row] });
            interaction.reply({ content: "All set!", ephemeral: true });
        });
    }
};
