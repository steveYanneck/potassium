"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const axios = require("axios");
const key = "ukwqYaYZRTsXrAwKEEogkELHkBIClvBKZsKJCkLvCZlJbwSFvTBRRGjgMxpdYJuN";
const url = "https://fanadmin.steveyanneck.repl.co/db/user";
module.exports = {
    construct: {
        name: "candidate",
        description: "returns a list of data meant for background checks",
        options: [
            {
                type: discord_js_1.ApplicationCommandOptionType.User,
                name: "user",
                description: "the user you want to look up",
                required: true
            },
        ]
    },
    guild: true,
    execute(client, interaction) {
        interaction.deferReply();
        const member = interaction.options.getMember("user");
        axios({
            method: 'get',
            url: `https://fanadmin.steveyanneck.repl.co/db/user?key=${key}&id=${member.user.id}`
        })
            .then((res) => {
            const userData = res.data;
            const guilds = userData.guilds.map((guild) => {
                return guild.name;
            });
            const embed = new discord_js_1.EmbedBuilder()
                .addFields([
                {
                    name: "User",
                    value: `${member.user.tag}`,
                    inline: true
                },
                {
                    name: "2FA Enabled",
                    value: `${userData.user.mfa_enabled}`,
                    inline: true
                }
            ])
                .setColor("#FFFF00")
                .setTitle("Candidate Background Info")
                .setFooter({ text: "Shown information is confidential and should not be shared outside of the staff team!" })
                .setDescription(`**Servers**\n${guilds.join("\n")}`);
            interaction.editReply({ embeds: [embed] });
        })
            .catch((err) => {
            console.log(err);
            interaction.editReply(`Seems like i couldnt find any info about user ${member.user.tag}`);
        });
    }
};
