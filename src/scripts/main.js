'use strict';
exports.__esModule = true;

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

class config {
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

exports.config = config