'use strict';

const discord = require('discord.js');
const client = new discord.Client();
const fs = require("fs");
const chalk = require("chalk")

const interpreter = require('./interpreter')

client.commands = new discord.Collection();
client.cmdcode = new discord.Collection();
client.botprefix = new discord.Collection();
client.embed = new discord.Collection();

const { Type } = require("../utils/types");
const guildMemberAdd = require("../events/guildMemberAdd");
const guildMemberRemove = require("../events/guildMemberRemove");

class gydo {
    /**
     * 
     * Simple and needed setup to start the bot
     * @param {string} Clients Token
     * @param {string<Prefix>} Clients Prefix
     */
    constructor (va) {
        if(!va.token) throw new Error(`INVALID_TOKEN`);

        if(!va.prefix) return console.error(`No Prefix Given!`);
        this.prefix = va.prefix
        this.token = va.token
        
        if(typeof va.token !== 'string') return console.error(`Token must be a string!`);
        if(typeof va.prefix !== 'string') throw new Error(`PREFIX_NOT_A_STRING`)
        
        client.botprefix.set("prefix", this.prefix)

        client.login(this.token);
        client.on('ready', async () => {
            console.log(chalk.red(`Bot is Ready! | Logged in as ${client.user.tag}`))
        });
    }
    
    /**
     * A Welcome Message (guildMemberAdd Event)
     * Requires a channel id to return the message
     * @param {string<message>} Message
     * @param {Number<channel>} IDNum
     * @retuens {channel <message>} Message
    */ 
    guildMemberAdd(va) {
        guildMemberAdd(client, va)
    }
    
    /**
     * A leave message (guildMemberRemove Event)
     * @param {string<message>} Message
     * @param {Number<channel>} IDNum
     * @retuens {channel <message>} Message
    */ 
    guildMemberRemove(va) {
        guildMemberRemove(client, va)
    }
    
    /**
    * Sets the Status for the Bot
    * @param {string} Content
    * @returns {string} Status
    */
    status(status, type = {}) {
        this.status = status
        this.type = type
        if(!this.status) throw new Error(`NO_STATUS_GIVEN`)
        
        if(typeof this.status !== "string") throw new Error(`NOT_VALID_STATUS`)
        
        client.on("ready", async () => {
            client.user.setActivity(this.status, { type: type })
            await console.log(chalk.blue(`Bot's status set to: ${this.status}`))
        });
        
        const Types = type.TYPES
        
        type = { Types: type }
    }
    
    /**
     * Bans a mentioned member if user has the permission to do so, and audit logs the reason.
     * @param {string} member
     * @returns GuildBan member 
     */
    banMember() {
        client.on("message", async (message) => {
            const prefix = this.prefix
            const args = message.content.slice(prefix.length).trim().split(/ +/)
            const command = args.shift().toLowerCase()
            
            if(command === "ban") {
                if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`:x: You do not have permission to use this command`)
                
                const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || args[0]
                if(!target) message.reply(`:x: You haven't mentioned a member to ban (Can also Use ID)`)
                let reason = args.slice(1).join(" ")
                if(!reason) reason = "No reason given"
                
                message.guild.members.ban(target, {
                    reason: reason
                }).then((user) => {
                    message.channel.send(`${user.tag} has now been banned from the server!`)
                }).catch((err) => {
                    message.channel.send(`:x: There was an error while trying to ban the user stated.`)
                    console.log(err)
                });
            }
        });
    }
    
    /**
     * Kick Members
     * @param {string|number<user>}
     * @returns GuildKick UserMention|UserID
    */ 
    kickMember() {
        client.on("message", async (message) => {
            const prefix = this.prefix
            const args = message.content.slice(prefix.length).trim().split(/ +/)
            const command = args.shift().toLowerCase()
            
            if(command === "ban") {
                if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`:x: You do not have permission to use this command`)
                
                const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
                if(!target) message.reply(`:x: You haven't mentioned a member to ban (Can also Use ID)`)
                let reason = args.slice(1).join(" ")
                if(!reason) reason = "No reason given"
                
                message.guild.members.kick(target, {
                    reason: reason
                }).then((user) => {
                    message.channel.send(`${user.tag} has now been kicked from the server!`)
                }).catch((err) => {
                    message.channel.send(`:x: There was an error while trying to ban the user stated.`)
                    console.log(err)
                });
            }
        });
    }

    /**
     * Sets a new command for the bot
     * @param {String|Object}
     * @returns {String} Code
     */
    cmd(cmd) {
        this.cmdname = cmd.name
        
        if(!cmd.name) throw new Error(`CMD_NAME_EMPTY`)

        if(!cmd.code) throw new Error(`CMD_CODE_EMPTY`)

        if(typeof cmd.name !== 'string') throw new TypeError(`CMD_NAME_NOT_STRING`)
        if(typeof cmd.code !== 'string') throw new TypeError(`CMD_CODE_NOT_STRING`)

        client.commands.set(cmd.name, cmd.name);
        client.cmdcode.set(cmd.name, cmd.code);
        //client.embed.set(cmd.name, cmd.embed)
    }

    /**
     * Detects the command
     * @returns {String|Object<command>}
     */
    MessageDetect() {
        interpreter(client)
    }
    
    /**
     * A Loop Status for your Discord Bot
     * @param {Object} Status
     * @param {Number} Miliseconds
     * Must be less than 1000 ms
    */
    loopStatus(object, time, type = {}) {
        // Errors 
        if(!object) throw new Error(`NO_STATUS_GIVEN`);
        if(!time) throw new Error(`NO_LOOP_MS_TIME_GIVEN`);
        if(!type) throw new Error(`NO_STATUS_TYPE_GIVEN`)
        
        if(typeof object !== "object") throw new TypeError(`NOT_ARRAY`);
        if(typeof time !== 'number') throw new TypeError(`TIME_NOT_A_NUMBER`);
        
        // Sets the Changing Status Loop
        client.on("ready", async () => {
            let index = 0
            setInterval(() => {
                if(index === object.length) index = 0;
                const res = object[index];
                client.user.setActivity(res, { type: type })
                index++;
            }, time);
        });
        
        const Types = Type.TYPES
        
        type = { Types: type }
    }
    
    embed(emb) {
        let embed = new discord.MessageEmbed()
        
        if(!emb.title) throw new Error(`NO_EMBED_TITLE`)
        if(!emb.desc) throw new Error(`NO_EMBED_DESC`)
        
        embed.addField(emb.title, emb.desc)
        
        if(emb.author) {
            embed.setAuthor(emb.author, emb.authorurl)
        }
        
        if(emb.footer) {
            embed.setFooter(emb.footer, emb.footerurl)
        }
        
        embed.setColor(emb.color)
        
        if(emb.timestamp == true) {
            embed.setTimestamp()
        }
        
        client.embed.set(this.cmdname, embed)
    }
}

module.exports = gydo
// module.exports = Client

//             OLD CODE
/*
client.on('guildMemberAdd', member => {
  if(setup.MemberLog.memberleavejoin === '') {console.log()}
  if(setup.MemberLog.memberleavejoin === 'CHANNEL ID') {console.log()}
  if(setup.MemberLog.serverid === '') {console.log()}
  if(setup.MemberLog.serverid === 'guildID') {console.log()}
  if(setup.MemberLog.JoinMessage === '') {console.log('Message Error. No message found in MemberLog: message field'); process.kill(process.pid)}
  const guildID = `${setup.MemberLog.serverid}`
  const channelID = `${setup.MemberLog.memberleavejoin}`;
  if(member.guild.id === guildID) {
     const channel = client.channels.cache.get(channelID);

     var text = setup.MemberLog.JoinMessage
     var text2 = text.replace("{author}", `${member}`)
     var text3 = text2.replace("{ping}", `${client.ws.ping}`)
     var text4 = text3.replace("{server}", `${member.guild.name}`)
     var newtext = text4.replace("{memberCount}", `${member.guild.members.cache.size}`)

channel.send(newtext);
  }
});

client.on('guildMemberRemove', member => {
  if(setup.MemberLog.memberleavejoin === '') {console.log()}
  if(setup.MemberLog.memberleavejoin === 'CHANNEL ID') {console.log()}
  if(setup.MemberLog.serverid === '') {console.log()}
  if(setup.MemberLog.serverid === 'guildID') {console.log()}
  const guildID = `${setup.MemberLog.serverid}`
  const channelID = `${setup.MemberLog.memberleavejoin}`;
  if(member.guild.id === guildID) {
     const channel = client.channels.cache.get(channelID);

channel.send(`Sad to see you leave ${member}.`);
  }
});*/
