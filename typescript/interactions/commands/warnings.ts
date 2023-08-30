import { ApplicationCommandOptionType, Client, CommandInteraction, EmbedBuilder } from "discord.js";

const datastore = require("./../../modules/data/main.js")
module.exports = {
    construct: {
        name: "warnings",
        description: "shows the warnings of the given user",
        options: [
            {
                name: "user",
                type: ApplicationCommandOptionType.User,
                required: true,
                description: "the user"
            }
        ]
    },
    async execute (client: Client, interaction: CommandInteraction) {
        const member = interaction.options.getMember("user")
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
            if (warning.expires < Date.now()) {
                warning.expired = true
            }
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
        .setTitle(`${member.user.tag}'s warnings:`)
        .setFooter({text: `${warnings.length} warnings in total found`})

        interaction.reply({embeds:[embed]})
    }
}