import { BaseInteraction, Client, CommandInteraction, InteractionType } from "discord.js";
import * as fs from "fs"

const commandFiles = fs.readdirSync(`${__dirname}/../interactions/commands`)
module.exports = {
    name: "interactionCreate",
    execute(client:Client, interaction:CommandInteraction) {
        console.log("Interaction created")
        if (interaction.type != InteractionType.ApplicationCommand) return
        if(interaction.isContextMenuCommand()) return
        for (const commandFile of commandFiles) {
            const command = require(`${__dirname}/../interactions/commands/${commandFile}`)
            if (command.construct.name === interaction.command?.name) {
                console.log(`Executing ${interaction.command?.name}`)
                command.execute(client, interaction)
            }
            console.log(interaction)
        }
    }
}