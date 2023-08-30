import { APIInteractionGuildMember, ButtonInteraction, Client, GuildMember, GuildMemberRoleManager } from "discord.js";
const { newMemberRole } = require("./../../../config/manifest.json")
module.exports = {
    name: "verify",
    async execute(client: Client, interaction: ButtonInteraction) {
        const member: GuildMember | APIInteractionGuildMember | null = interaction.member
        //@ts-ignore
        member?.roles.add(newMemberRole)
        interaction.reply({content: "All set!", ephemeral: true})
    }
}