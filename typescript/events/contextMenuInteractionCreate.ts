import { BaseInteraction, Client, CommandInteraction, InteractionType } from "discord.js";
import * as fs from "fs"

const commandFiles = fs.readdirSync(`${__dirname}/../interactions/contextMenu`)
module.exports = {
    name: "interactionCreate",
    execute(client:Client, interaction:CommandInteraction) {
        if (!interaction.isUserContextMenuCommand()) return
        for (const commandFile of commandFiles) {
            const command = require(`${__dirname}/../interactions/contextMenu/${commandFile}`)
            if (command.construct.name === interaction.command?.name) {
                command.execute(client, interaction)
            }
        }
    }
}