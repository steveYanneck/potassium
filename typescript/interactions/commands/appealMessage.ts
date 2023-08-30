import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, CommandInteraction, EmbedBuilder } from "discord.js";

module.exports = {
    construct: {
        name: "appealmessage",
        description: "posts the appeal message"
    },
    async execute(client: Client, interaction: CommandInteraction) {
        const embed = new EmbedBuilder()
        .setTitle("APPEAL")
        .setDescription("Press the button below to open an appeal request.")
        .setColor("#0051ff")
        const row:any = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("appeal")
            .setLabel("APPEAL")
            .setStyle(ButtonStyle.Primary)
        )
        interaction.channel?.send({embeds: [embed], components: [row]})
        interaction.reply({content: "All set!", ephemeral: true})
    }
}