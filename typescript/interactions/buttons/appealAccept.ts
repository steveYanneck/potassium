import { ButtonInteraction, Client } from "discord.js";

module.exports = {
    name: "appeal-accept",
    async execute (client:Client, interaction:ButtonInteraction) {
        interaction.message.delete()
        interaction.reply({content: "Appeal accepted. You do need to unban the user manually", ephemeral: true})
    }
}