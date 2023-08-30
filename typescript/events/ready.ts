import { Client } from "discord.js";
import * as fs from "fs"

const commandFiles = fs.readdirSync(`${__dirname}/../interactions/commands`)
const contextMenuFiles = fs.readdirSync(`${__dirname}/../interactions/contextMenu`)
module.exports = {
    once: true,
    name: "ready",
    async execute (client: Client) {
        const guild = await client.guilds.fetch({guild: "819213402056163398"})
        for (const commandFile of commandFiles) {
            const command = require(`${__dirname}/../interactions/commands/${commandFile}`)
            if (command.guild) {
                guild.commands.create(command.construct)
            } else {
                client.application?.commands.create(command.construct)
            }
        }

        for (const contextMenuFile of contextMenuFiles) {
            const contextMenu = require(`${__dirname}/../interactions/contextMenu/${contextMenuFile}`)

            if (contextMenu.guild) {
                guild.commands.create(contextMenu.construct)
            } else {
                client.application?.commands.create(contextMenu.construct)
            }
        }
        console.log(`${client.user?.tag} is all set up!`)
    }
}

