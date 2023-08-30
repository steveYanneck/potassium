import { ButtonInteraction, Client } from "discord.js";

module.exports = {
    name: "appeal-deny",
    async execute (client:Client, interaction:ButtonInteraction) {
        interaction.message.delete()
        interaction.reply({content: "Appeal rejected", ephemeral: true})
    }
}