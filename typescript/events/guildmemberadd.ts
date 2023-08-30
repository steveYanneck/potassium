import { Client, GuildMember } from "discord.js";

const datastore = require("./../modules/data/main.js")

module.exports = {
    name: "guildMemberAdd",
    async execute (client:Client, member: GuildMember) {
        //check for existing data
        let userData = await datastore.fetch(member.id)
        console.log(userData)
        if (userData === undefined) {
            console.log("creating new data")
            datastore.create(member)
            return
        }
        console.log(userData)
        if (userData.regularMember != true) {
            userData.firstJoined = member.joinedTimestamp
            datastore.update(member.id, userData)
        } else {
            member.roles.set(userData.roles)
        }
    }
}