import { ApplicationCommandType, Client, ContextMenuCommandBuilder, ContextMenuCommandInteraction, EmbedBuilder, UserContextMenuCommandInteraction } from "discord.js"

const datastore = require("./../../modules/data/main.js")

module.exports = {
    construct: {
        name: "warnings",
        type: ApplicationCommandType.User
    },
    
    async execute (client:  Client, interaction: UserContextMenuCommandInteraction) {
        const member = interaction.targetUser
        //@ts-ignore
        const userData = await datastore.fetch(member.id)
        const warnings = userData.warnings

        if (warnings.length === 0) {
            //@ts-ignore
            interaction.reply({content: `<@${member.id}> doesnt have any warnings`, ephemeral: true})
            return
        }
        let fields = []

        for (const warning of warnings) {
            if (warning.expired === false) {
                const field = {
                    name: `${warning.id}`,
                    value: `reason: ${warning.reason}\nexpires: <t:${Math.round(warning.expires/1000)}>\nmoderator:<@${warning.moderator}>`
                }
                fields.push(field)
            } else {
                const field = {
                    name: `~~${warning.id}~~`,
                    value: `~~reason: ${warning.reason}\nexpires: <t:${Math.round(warning.expires/1000)}>\nmoderator:<@${warning.moderator}>~~`
                }
                fields.push(field)
            }
        }

        const embed = new EmbedBuilder()
        .addFields(fields)
        .setColor("#bbff00")
        //@ts-ignore
        .setTitle(`${member.tag}'s warnings:`)
        .setFooter({text: `${warnings.length} warnings in total found`})

        interaction.reply({embeds:[embed], ephemeral: true})
    }
}