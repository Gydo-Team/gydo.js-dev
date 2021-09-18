"use strict";
// Interpreter 
// Detects the messages and see if
// it matches the command you made

const { MessageEmbed } = require("discord.js");

const interpreter = async (client) => {
    const s = client.botprefix.get("prefix")
        
    client.on("messageCreate", async (message) => {
        const prefix = `${s}`;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        
        const h = client.cmdcode.get(command)

        const cmdName = await client.commands.get(command)
        if(!message.content.startsWith(prefix)) return;
        if(message.author.bot) return;
            
        const code = `${h}`
        let argNum;
        if(args != null && args.length >= -1 && cmdName != undefined && cmdName != null && args != undefined && args.length) { 
            argNum = code.split("{args;")[1].split("}")[0];
        } else if (!args.length) {
            argNum = 0;
        }
        
        let res = await code
        .replace("{ping}", client.ws.ping)
        .replace("{message-author-tag}", message.author.tag)
        .replace("{message-author-id}", message.author.id)
        .replace("{bot-user-tag}", client.user.tag)
        .replace("{bot-user-id}", client.user.id)
        .replace("{guildname}", message.guild.name)
        .replace(`{args;${argNum}}`, args[argNum])
        
        let isReply;
        let replyBool = client.cmdreply.get(command);
        if(replyBool == true) {
            isReply = true;
        } else if(replyBool == false) {
            isReply = false;
        } else isReply = false;
    
        try {
            if(command === cmdName) {
                if(isReply == false) {
                    await message.channel.send({
                        content: res,
                    });
                }
            
                if(isReply == true) {
                    await message.reply({
                        content: res,
                    });
                }
            }
        } catch (err) {
            console.error(err);
        }
    });
}

module.exports = interpreter;