import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, Client, EmbedBuilder, Guild, Message, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from "discord.js";
const manifest = require("./../../../config/manifest.json")
module.exports = {
    name: "appeal",
    async execute (client:Client, interaction:ButtonInteraction) {
        const member = interaction.member
        //@ts-ignore
        let banned = false
        //@ts-ignore
        await (await client.guilds.fetch(manifest.guild)).bans.fetch(member.id)
        .then( (ban) => {
            console.log(ban)
            banned = true
        })
        .catch( () => {
            interaction.reply({content: "You dont seem to be banned from the server", ephemeral: true})
        })
        if (banned === false) return
        const modal = new ModalBuilder()
        .setCustomId("appealModal")
        .addComponents(
            //@ts-ignore
            new ActionRowBuilder().addComponents(
                //@ts-ignore
                new TextInputBuilder()
                .setCustomId("reason")
                .setLabel("For what reason did you get banned for?")
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph)
            ),
            //@ts-ignore
            new ActionRowBuilder().addComponents(
                //@ts-ignore
                new TextInputBuilder()
                .setCustomId("why-unjustified")
                .setLabel("Why do you think your ban in not justified?")
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph)
            )
        )
        .setTitle("APPEAL REQUEST")

        await interaction.showModal(modal)
        //@ts-ignore
        const filter = (i) => i.customId === "appealModal" && i.member.id === interaction.member.id
        interaction.awaitModalSubmit({filter, time: 300_000})
        .then(async (modalInteraction:ModalSubmitInteraction) => {
            const embed = new EmbedBuilder()
            .setColor("#00ffff")
            .setTitle("Appeal Request")
            .addFields([
                {
                    name: "Username",
                    //@ts-ignore
                    value: member?.user.tag,
                    inline: true
                },
                {
                    name: "ID",
                    //@ts-ignore
                    value: member.id,
                    inline: true
                },
                {
                    name: "Status",
                    value: "Open",
                    inline: false
                },
                {
                    name: "Why did you get banned?",
                    value: modalInteraction.fields.getTextInputValue("reason"),
                    inline: false
                },
                {
                    name: "why do you think the ban is not justified?",
                    value: modalInteraction.fields.getTextInputValue("why-unjustified"),
                    inline: false
                }
            ])

            const buttons = new ActionRowBuilder().addComponents(
                //@ts-ignore
                new ButtonBuilder()
                .setCustomId("appeal-deny")
                .setLabel("REJECT")
                .setStyle(ButtonStyle.Danger),
                //@ts-ignore
                new ButtonBuilder()
                .setCustomId("appeal-accept")
                .setLabel("ACCEPT")
                .setStyle(ButtonStyle.Success)
            )
            
            const channel = await client.channels.fetch(manifest.appealChannel)
            //@ts-ignore
            channel.send({embeds: [embed], components: [buttons]})
            .then( async (message:Message) => {
                //@ts-ignore
                message.startThread({name: member?.user.username})
                modalInteraction.reply({content: "Succesfully sent your appeal request", ephemeral: true})
            })
        })
        .catch( () => {
            return
        })
    }
}