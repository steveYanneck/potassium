import { Client, CommandInteraction } from "discord.js";

module.exports = {
    construct: {
        name: "emitmemberadd",
        description: "triggers guildMemberAdd"
    },
    guild: true,
    execute(client: Client, interaction: CommandInteraction) {
        //@ts-ignore
        client.emit("guildMemberAdd", interaction.member)
        interaction.reply({content: "Emitted", ephemeral: true})
    }
}