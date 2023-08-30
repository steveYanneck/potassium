"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    construct: {
        name: "emitmemberadd",
        description: "triggers guildMemberAdd"
    },
    guild: true,
    execute(client, interaction) {
        //@ts-ignore
        client.emit("guildMemberAdd", interaction.member);
        interaction.reply({ content: "Emitted", ephemeral: true });
    }
};
