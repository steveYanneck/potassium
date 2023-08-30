"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    construct: {
        name: "ping",
        description: "returns pong"
    },
    execute(client, interaction) {
        interaction.reply({ content: "pong!", ephemeral: true });
    }
};
