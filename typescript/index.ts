import { Client, ClientOptions, GatewayIntentBits } from "discord.js";
import * as fs from "fs";

const { token } = require("./../config/botconfig.json")
const clientOptions: ClientOptions = { 
    intents: [
        GatewayIntentBits.DirectMessages, 
        GatewayIntentBits.GuildBans, 
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences
    ]
}
const bot = new Client(clientOptions)

const events = fs.readdirSync(`${__dirname}/events`).filter(file => file.endsWith(".js"))


for (const eventFile of events) {
    let event = require(`${__dirname}/events/${eventFile}`)

    if (event.once) {
        bot.once(event.name, (...args) => event.execute(bot, ...args))
    } else {
        bot.on(event.name, (...args) => event.execute(bot, ...args))
    }
}

bot.login(token)