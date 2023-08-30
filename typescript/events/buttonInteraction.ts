import { ButtonInteraction, Client, InteractionType } from "discord.js";
import * as fs from "fs"
const ButtonDirPath = `${__dirname}/../interactions/buttons`
module.exports = {
    name: "interactionCreate",
    async execute (client: Client, interaction: ButtonInteraction) {
        if (interaction.type != InteractionType.MessageComponent) return
        if (!interaction.isButton()) return
        const files = fs.readdirSync(ButtonDirPath)
        for (const file of files) {
            const module = require(`${ButtonDirPath}/${file}`)
            if (module.name === interaction.customId) {
                module.execute(client, interaction)
                break
            }
        }
    }
}