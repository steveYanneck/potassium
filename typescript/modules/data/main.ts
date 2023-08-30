const config = require("./../../../config/botconfig.json")
const {encrypt, decrypt} = require("./encryption.js")
import { GuildMember } from "discord.js"
import postgres from "postgres"
//@ts-ignore
import * as pg from "pg"

const pgClient = new pg.Client({
    connectionString: config.postgresUrl
})

pgClient.connect()
const sql = postgres(config.postgresUrl)

module.exports = {
    async fetch(id: string) {
        const key = encrypt(id)

        const response = await pgClient.query(`SELECT * FROM user_data WHERE user_id='${key}'`)

        if (response.rows[0]) {
            const userData = JSON.parse(decrypt(response.rows[0].userdata))
            return userData
        } else {
            console.log("no data found")
            return undefined
        }
    },

    async update(id: string, data:any) {
        const key = encrypt(id)

        const response = await pgClient.query(`SELECT * FROM user_data WHERE user_id='${key}'`)

        if (!response.rows[0]) return false

        await pgClient.query(`UPDATE user_data SET userdata='${encrypt(data)}' WHERE user_id='${key}'`)
        
        return true
    },

    async create(member:GuildMember) {
        const key = encrypt(member.id)

        const data = {
            firstJoined: member.joinedTimestamp,
            roles: member.roles.cache,
            regularMember: false,
            banned: false,
            warnings: [],
        }
        const encryptedData = encrypt(data)
        
        const outputTable = {
            data: data,
            encryptedData: encryptedData
        }
        console.log(outputTable)

        await pgClient.query(`INSERT INTO user_data (user_id, userdata) VALUES ('${key}', '${encryptedData}')`)

        return true
    },

    async fetchAllData () {
        const response = await pgClient.query(`SELECT * FROM user_data`)

        let userData = response.rows.map(function(row:any) {
            const data = {
                user_id: decrypt(row.user_id),
                userData: JSON.parse(decrypt(row.userdata))
            }
            return data
        })
        return userData
    }
}