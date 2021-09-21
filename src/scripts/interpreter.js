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
        
        // Raw Code
        const h = client.cmdcode.get(command);

        const cmdName = await client.commands.get(command)
        if(!message.content.startsWith(prefix)) return;
        if(message.author.bot) return;
            
        const code = `${h}`
        let argNum;
        let argRes;
        if(args.length && args.length > -1 && cmdName != undefined) { 
            argNum = code.split("{args;")[1].split("}")[0];
            argRes = args[argNum];
        } else if (!args.length) {
            argRes = "";
        }
        
        // Replacing
        let res = await code
        .replace("{ping}", client.ws.ping)
        .replace("{message-author-tag}", message.author.tag)
        .replace("{message-author-id}", message.author.id)
        .replace("{bot-user-tag}", client.user.tag)
        .replace("{bot-user-id}", client.user.id)
        .replace("{guildname}", message.guild.name)
        .replace(`{args;${argNum}}`, argRes)
        
        let isReply;
        let replyBool = client.cmdreply.get(command);
        if(replyBool == true) {
            isReply = true;
        } else if(replyBool == false) {
            isReply = false;
        } else isReply = false;
        
        
        // Raw Embed Values
        const RawEmbedTitle = client.embedTitle.get(command);
        const RawEmbedDescription = client.embedDesc.get(command);
        const RawEmbedFooter = client.embedFooter.get(command);
        const RawEmbedFields = client.embedFields.get(command);
        const RawEmbedColor = client.embedColor.get(command);
        const RawEmbedTimestamp = client.embedTimestamp.get(command);
        const RawEmbedAuthor = client.embedAuthor.get(command);
        const RawEmbedAuthorURL = client.embedAuthorURL.get(command);
        const EmbedCMDList = client.embedCMDList.get(command);
        
        let EmbedRaw;
        let EmbedResult;
        
        if (RawEmbedTitle != undefined && RawEmbedDescription != undefined) {
            EmbedRaw = new MessageEmbed();
            
            if (RawEmbedTitle) {
                    EmbedRaw.setTitle(RawEmbedTitle.toString());
            }   
        
            if (RawEmbedDescription) {
                EmbedRaw.setDescription(RawEmbedDescription.toString());
            }
        
            if (RawEmbedFooter) {
            EmbedRaw.setFooter(RawEmbedFooter.toString());
            }
        
            if (RawEmbedFields) {
                for(let i = 0; i < RawEmbedFields.length; i++) {
                    EmbedRaw.addField(RawEmbedFields[i].name, RawEmbedFields[i].value, RawEmbedFields[i].inline);
                }
            }
        
            if (RawEmbedColor) {
                EmbedRaw.setColor(RawEmbedColor.toString());
            }
        
            if (RawEmbedTimestamp && RawEmbedTimestamp == true) {
                EmbedRaw.setTimestamp();
            }
        
            if (RawEmbedAuthor) {
                let hasAuthorURL;
                if (RawEmbedAuthorURL) {
                hasAuthorURL = RawEmbedAuthorURL.toString();
            } else hasAuthorURL = null;
                EmbedRaw.setAuthor(RawEmbedAuthor.toString(), hasAuthorURL);
            }
            
            EmbedResult = [EmbedRaw];
        } else EmbedResult = [];
    
        // Sending the Message
        try {
            if(command === cmdName) {
                if(isReply == false) {
                    await message.channel.send({
                        content: res,
                        embeds: EmbedResult,
                    });
                }
            
                if(isReply == true) {
                    await message.reply({
                        content: res,
                        embeds: EmbedResult,
                    });
                }
            }
        } catch (err) {
            console.error(err);
        }
    });
}

module.exports = interpreter;