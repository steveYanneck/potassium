import { Client, EmbedBuilder } from "discord.js";
const CronJob = require('cron').CronJob;
const datastore = require("./../modules/data/main.js")
const manifest = require("./../../config/manifest.json")
module.exports = {
    name: "ready",
    async execute (client: Client) {
        const checkUser = new CronJob('0 * * * *', async () => { //every hour
            console.log("Running cronjob")
            const userData = await datastore.fetchAllData()
            for (const data of userData) {
                let changes = false
                const timestamp = data.userData.firstJoined
                const oneWeekMembership = timestamp + 604800000
                let rawMemberData = await datastore.fetch(data.user_id)
               if (data.userData.regularMember === false) {
                    if (Date.now() >= oneWeekMembership) { //checks if new member has been in the server for a week and gives them the "regular member" role. To ignore this check just remove the whole if statement.
                        try {
                            const member = await (await client.guilds.fetch(manifest.guild)).members.fetch(data.user_id)
                            if (!member.roles.cache.has("1028596599162683464")) continue
                            changes = true
                            rawMemberData.regularMember = true
                            await member.roles.add([manifest.regularMemberRole])
                            await member.roles.remove([manifest.newMemberRole])
                            
                            const embed = new EmbedBuilder()
                            .setTitle("REGULAR MEMBER")
                            .setDescription(`Hello ${member.user.tag},\n\nIt looks like you have been a member in {SERVER} for a week now. For that we have given you the regular member role. With this role you can now add attachments to your messages and the automod will be less strict now.\n\nRegards\The Staff Team`)
                            .setColor("#42f551")
                            
                            try {
                                member.send({embeds: [embed]})
                            } catch {

                            }
                            console.log(`Updated roles for ${member.user.tag}`)
                        } catch (err) {
                            console.log(`Could not process user wit the following error:\n\n${err}`)
                        }
                    }
                }

                if (rawMemberData.warnings.length >= 1) { //checks if a warning has exceeded its expiration date
                    changes = true
                    rawMemberData.warnings.map((warning:any) => {
                        if (warning.expires <= Date.now()) {
                            warning.expired = true
                        }
                        return warning
                    })
                }
                if (changes === true) { //pushes the changes to the database
                    await datastore.update(data.user_id, rawMemberData)
                }
            }
        })
        checkUser.start()
    }
}
