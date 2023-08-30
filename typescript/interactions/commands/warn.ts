import { ApplicationCommandOptionType, Client, CommandInteraction, GuildMember, EmbedBuilder, Embed } from "discord.js";

const expirationDate = { //time in ms on how long the warning is stored
    minor: 2592000000,
    normal: 7776000000,
    mayor: 999999999999000,
}

const datastore = require("./../../modules/data/main.js")

module.exports = {
    guild: true,
    construct: {
        name: "warn",
        description: "warns a user for an offense",
        options: [
            {
                type: ApplicationCommandOptionType.User,
                name: "user",
                description: "the user you want to assign the warning to",
                required: true
            },
            {
                type: ApplicationCommandOptionType.String,
                name: "reason",
                description: "the reason of the warning",
                required: true
            },
            {
                type: ApplicationCommandOptionType.String,
                name: "severity",
                description: "how severe the offense",
                choices: [
                    {
                        name: "minor",
                        value: "minor"
                    },
                    {
                        name: "normal",
                        value: "normal"
                    },
                    {
                        name: "mayor",
                        value: "mayor"
                    }
                ],
                required: true
            }
        ]
    },
    async execute(client: Client, interaction: CommandInteraction) {
        const member = interaction.options.getMember("user")
        const reason = interaction.options.get("reason")?.value
        const severity = interaction.options.get("severity")?.value
        
        if (severity != "minor" && severity != "normal" && severity != "mayor") {
            interaction.reply({content:"Severity type is invalid!", ephemeral: true})
            return
        }
        await interaction.deferReply()
        //@ts-ignore
        let userData = await datastore.fetch(member.id)
        let warnings:any = userData.warnings
        console.log(warnings)
        console.log(userData)
        const newWarning = {
            reason: reason,
            moderator: interaction.member?.user.id,
            issued: Date.now(),
            //@ts-ignore
            expires: Date.now() + expirationDate[severity],
            expired: false,
            severity: severity,
            id: Date.now().toString()
        }

        warnings.push(newWarning)
        userData.warnings = warnings
        console.log(userData)
        //@ts-ignore
        datastore.update(member.id, userData)
        let success
        try {
            const embed = new EmbedBuilder()
            .setTitle("WARNING")
            .setDescription(`Our moderators have issued a ${severity} warning on your account for violating our server rules!`)
            //@ts-ignore
            .addFields([
                {
                    name: "moderator",
                    //@ts-ignore
                    value: `<@${member.id}>`,
                    inline: true
                },
                {
                    name: "severity",
                    value: severity,
                    inline: true
                },
                {
                    name: "reason",
                    value: reason
                }
            ])
            .setColor("#fcd303")
            //@ts-ignore
            member.user.send({embeds: [embed]})
            success = true
        } catch {
            success = false
        }
        if (success === true) {
            const embed = new EmbedBuilder()
            .setTitle("WARNING ISSUED")
            //@ts-ignore
            .setDescription(`A warning has successfully been issued to <@${member.id}>`)
            //@ts-ignore
            .addFields([
                {
                    name: "moderator",
                    //@ts-ignore
                    value: `<@${member.id}>`,
                    inline: true
                },
                {
                    name: "severity",
                    value: severity,
                    inline: true
                },
                {
                    name: "reason",
                    value: reason
                },
                {
                    name: "expires",
                    value: `<t:${Math.round(newWarning.expires/1000)}>`
                }
            ])
            .setColor("#1bb500")
            interaction.editReply({embeds: [embed]})
        } else {
            const embed = new EmbedBuilder()
            .setTitle("WARNING ISSUED")
            //@ts-ignore
            .setDescription(`A warning has successfully been issued to <@${member.id}> but i couldnt dm them`)
            //@ts-ignore
            .addFields([
                {
                    name: "moderator",
                    //@ts-ignore
                    value: `<@${member.id}>`,
                    inline: true
                },
                {
                    name: "severity",
                    value: severity,
                    inline: true
                },
                {
                    name: "reason",
                    value: reason
                },
                {
                    name: "expires",
                    value: `<t:${Math.round(newWarning.expires/1000)}>`
                }
            ])
            .setColor("#1bb500")
            interaction.editReply({embeds: [embed]})
        }
    }
}