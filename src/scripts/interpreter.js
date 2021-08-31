const fs = require("fs");
const discord = require("discord.js");

const interpreter = async (client) => {
    const s = client.botprefix.get("prefix")
    const prefix = `${s}`
    

    client.on("messageCreate", message => {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        
        if(message.author.bot) return;
        
        // Getting the code name, and the actual code.
         const h = client.cmdcode.get(command)
            
        const code = `${h}`
        
        const embed = client.embed.get(command)
            
        // interpreter
        let res = code
        .split("{ping}").join(`${client.ws.ping}`)
        .split("{message-author-tag}").join(`${message.author.tag}`)
        .split("{message-author-id}").join(`${message.author.id}`)
        .split("{bot-user-tag}").join(`${client.user.tag}`)
        .split("{bot-user-id}").join(`${client.user.id}`)
        .split("{guildname}").join(`${message.guild.name}`)
    
        // Trying to send a message with a Try-Catch block
        try {
            if(command === client.commands.get(command)) {
                message.channel.send({
                    content: res
                });
            }
        } catch (err) {
            console.error(err)
        }
    });
}

module.exports = interpreter;