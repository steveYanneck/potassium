import { Client, CommandInteraction } from "discord.js";

module.exports = {
    construct: {
        name: "ping",
        description: "returns pong"
    },
    execute(client: Client, interaction: CommandInteraction) {
        interaction.reply({content: "pong!", ephemeral: true})
    }
}