'use strict';
const discord = require('discord.js');
const { Intents, Client, MessageEmbed, Constants } = require("discord.js");
const intents = new Intents();
const client = require('../utils/client');
const fs = require("fs");
const chalk = require("chalk");

client.commands = new discord.Collection();
client.cmdcode = new discord.Collection();
client.botprefix = new discord.Collection();
client.slashName = new discord.Collection();
client.slashCode = new discord.Collection();
client.slashEphemeral = new discord.Collection();
client.cmdreply = new discord.Collection();
client.cmds = new discord.Collection();

const guildMemberAdd = require("../events/guildMemberAdd");
const guildMemberRemove = require("../events/guildMemberRemove");
const interpreter = require("./interpreter");
const { Message, Presence, Channel, User, GuildMember, Role } = require("discord.js");
const { ApplicationCommandOptionTypes } = Constants;
const ActivityManager = require("../managers/ActivityManager");
const SlashCommandManager = require('../managers/SlashCommandManager');
const SaveEmbed = require('../utils/embed');
const MessageUpdate = require('../events/MessageUpdate');
const EventsManager = require('../managers/EventsManager');

class config {
    /**
     * 
     * Simple and needed setup to start the bot
     * @param {string} token
     * @param {string} prefix
     * @example
     * // Bot Setup
     * const gydo = require("gydo.js-dev");
     * const bot = new gydo.config({ 
     *     token: "TOKEN",
     *     prefix: "!"
     * });
     */
    constructor ({ token, prefix }) {
        if(!token) throw new Error(`INVALID_TOKEN`);

        if(!prefix) throw new Error(`No Prefix Given!`);
        
        /** 
        * Bot's prefix
        * @type {string}
        */
        this.prefix = prefix;
        
        /** 
        * Bot's token
        * Never share your bot's token with anyone!
        * @type {?string}
        * @private
        */
        this.token = token;
        
        if(typeof token !== 'string') throw new TypeError(`Token must be a string!`);
        if(typeof prefix !== 'string') throw new TypeError(`Prefix NOT a string`)
        
        client.botprefix.set("prefix", this.prefix)

        client.login(token);
        client.once('ready', async () => {
            console.log(chalk.red(`Bot is Ready! | Logged in as ${client.user.tag}`))
            
            if(client.isReady()) {
                /** 
                * Client's User Tag
                * @readonly
                */
                this.tag = client.user.tag;
            } else if(!client.isReady()) {
                this.tag = null;
            }
            
            /**
            * Bot Websocket Ping in Miliseconds 
            * @type {?number}
            * @readonly
            */
            this.ping = client.ws.ping ?? null;
            
            /** 
            * Bots ID
            * @type {?Snowflake}
            * @readonly
            */
            this.id = client.user.id ?? null;
        });
        
        /**
        * Activity of your Discord Bot
        * @type {ActivityManager}
        */
        this.activity = new ActivityManager();
        
        /**
        * Slash Commands
        * @type {SlashCommandManager}
        */
        this.slashCommand = new SlashCommandManager();
        
        /**
        * Events Manager for manual Events Managing
        * @type {EventsManager}
        */
        this.events = new EventsManager();
    }
    
    /**
     * A Welcome Message (guildMemberAdd Event)
     * Requires a channel id to return the message
     * @param {string} channel
     * @param {string} message
     * @example bot.guildMemberAdd({
         channel: "1234567891011",
         message: "{member} Welcome!"
     })
     */ 
    guildMemberAdd({ channel, message }) {
        new guildMemberAdd(channel, message);
    }
    
    /**
     * A leave message (guildMemberRemove Event)
     * @param {string} channel
     * @param {string} message
     * @example bot.guildMemberAdd({
         channel: "1234567891011",
         message: "Sad to see you leave {member}.."
     })
     */ 
    guildMemberRemove({ channel, message }) {
        new guildMemberRemove(channel, message);
    }
    
    /**
     * Executes when a message is updated
     * @param {string|Channel} channel
     * @param {string} message
     */
    MessageUpdate({ channel, message }) {
        new MessageUpdate({
            channel: channel,
            message: message
        });
    }

    /**
     * Sets a new command for the bot
     * @param {string} name
     * @param {string} code
     * @param {string} [messageReply]
     * @example
     * bot.cmd({
         name: 'ping',
         code: 'pong!'
     })
     */
    cmd({ name, code, messageReply }) {
        /**
        * Shows the commands you have put, if there is one
        * @type {?string}
        */
        this.cmdname = name;
        
        if(!name) throw new Error(`CMD_NAME_EMPTY`)

        if(!code) throw new Error(`CMD_CODE_EMPTY`)

        if(typeof name !== 'string') throw new TypeError(`CMD_NAME_NOT_STRING`)
        if(typeof code !== 'string') throw new TypeError(`CMD_CODE_NOT_STRING`)

        client.commands.set(name, name);
        client.cmdcode.set(name, code);
        client.cmdreply.set(name, messageReply);
    }

    /**
     * Detects the command
     * (Must have the right Intents)
     */
    MessageDetect() {
        new interpreter(client);
    }
    
    toJSON() {
        return client.toJSON();
    }
}

module.exports = config;