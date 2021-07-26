const discord = require("discord.js");
const { Message } = require('discord.js')
const gydo = require("./scripts/main")
const client = new discord.Client()

class Client {
    constructor(user, bot) {
        this.user = user
    }

    MessageEvent(bot) {
        client.on("message", async (message) => {
            if(message.author.bot) return;
        });
    }
    
    static ping = client.ws.ping
}

module.exports = Client