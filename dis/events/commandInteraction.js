"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs = __importStar(require("fs"));
const commandFiles = fs.readdirSync(`${__dirname}/../interactions/commands`);
module.exports = {
    name: "interactionCreate",
    execute(client, interaction) {
        var _a, _b;
        console.log("Interaction created");
        if (interaction.type != discord_js_1.InteractionType.ApplicationCommand)
            return;
        if (interaction.isContextMenuCommand())
            return;
        for (const commandFile of commandFiles) {
            const command = require(`${__dirname}/../interactions/commands/${commandFile}`);
            if (command.construct.name === ((_a = interaction.command) === null || _a === void 0 ? void 0 : _a.name)) {
                console.log(`Executing ${(_b = interaction.command) === null || _b === void 0 ? void 0 : _b.name}`);
                command.execute(client, interaction);
            }
            console.log(interaction);
        }
    }
};
