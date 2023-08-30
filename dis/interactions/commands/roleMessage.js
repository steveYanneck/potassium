"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selects = [
    { //gender
    },
    { //pups
    },
    { //side characters
    },
    { //opt in roles
    }
];
module.exports = {
    construct: {
        name: "rolemessage",
        description: "posts a set of messages with select menus with roles members can opt in for"
    },
    guild: true,
    execute(client, interaction) {
        interaction.reply({ content: "done!", ephemeral: true });
    }
};
