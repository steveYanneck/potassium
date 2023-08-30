import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, CommandInteraction, EmbedBuilder } from "discord.js";

module.exports = {
    construct: {
        name: "verifymessage",
        description: "posts the verify message"
    },
    async execute(client: Client, interaction: CommandInteraction) {
        const embed = new EmbedBuilder()
        .setTitle("VERIFICATION")
        .setDescription("Press the button below to gain access to the server. Please do note that new members will have less permissions compared to a regular member. This is just meant as a safety barrier and lifts automatically after a certain amount of time.")
        .setColor("#0051ff")
        const row:any = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("verify")
            .setLabel("VERIFY")
            .setStyle(ButtonStyle.Primary)
        )
        interaction.channel?.send({embeds: [embed], components: [row]})
        interaction.reply({content: "All set!", ephemeral: true})
    }
}