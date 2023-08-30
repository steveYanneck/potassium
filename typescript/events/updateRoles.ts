import { Client, GuildMember } from "discord.js";
const datastore = require("./../modules/data/main.js")

module.exports = {
    name: "guildMemberUpdate",
    async execute (client: Client, oldMember: GuildMember, newMember: GuildMember) {
        console.log("fired")
        if (oldMember.roles.cache === newMember.roles.cache) return
        console.log("Roles changed")
        let userdata = await datastore.fetch(oldMember.id)
        if(!userdata) return
        userdata.roles = newMember.roles.cache
        datastore.update(newMember.id, userdata)
    }
}