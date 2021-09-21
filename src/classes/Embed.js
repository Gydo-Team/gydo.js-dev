const client = require('../utils/client');
const { MessageEmbed } = require('discord.js');
const discord = require('discord.js');

client.embedTitle = new discord.Collection();
client.embedDesc = new discord.Collection();

client.embedFooter = new discord.Collection();
client.embedFields = new discord.Collection();
client.embedColor = new discord.Collection();
client.embedTimestamp = new discord.Collection();
client.embedAuthor = new discord.Collection();
client.embedAuthorURL = new discord.Collection();
client.doesEmbed = new discord.Collection();
client.embedCMDList = new discord.Collection();

class Embed {
    /** 
     * @typedef {object} IEmbed
     * @property {string} [title]
     * @property {string} [author]
     * @property {string} [authorURL]
     * @property {string} [description]
     * @property {string} [footer]
     * @property {IEmbedFields[]|string[]} [fields]
     * @property {string} [color]
     * @property {boolean} [timestamp]
    */
    
    /** 
     * @typedef {object[]} IEmbedFields
     * @property {string} [name]
     * @property {string} [value]
     * @property {boolean} [inline]
    */
    
    /** 
     * Discord Embed
     * @param {string} cmd
     * @param {IEmbed} options
    */
    constructor(cmd, options = { title, author, authorURL, description, footer, fields, color, timestamp }) {
        
        if(!cmd) throw new TypeError('No Command Specified');
        
        const prefix = client.botprefix.get("prefix").toString();
    
        const { title, description, footer, fields, color, timestamp, author, authorURL } = options;
        
        this.__cmd = cmd;
        this.__embedTitle = title;
        this.__embedDesc = description;
        this.__embedFooter = footer;
        this.__embedFields = fields;
        this.__embedColor = color;
        this.__embedTimestamp = timestamp;
        this.__embedAuthor = author;
        this.__embedAuthorURL = authorURL;
    
        // SaveEmbed(EmbedRaw, cmd);
        client.embedTitle.set(cmd, title);
        client.embedDesc.set(cmd, description);
        client.embedFooter.set(cmd, footer);
        client.embedFields.set(cmd, fields);
        client.embedColor.set(cmd, color);
        client.embedTimestamp.set(cmd, timestamp);
        client.embedAuthor.set(cmd, author);
        client.embedAuthorURL.set(cmd, authorURL);
        client.embedCMDList.set(`${prefix}${this.__cmd}`, this.__cmd)
    }
    
    /** 
     * Turns a Raw JSON Embed to Embed
     * @returns {MessageEmbed}
    */
    JSONtoEmbed(rawjson) {
        const JSONparse = JSON.parse(rawjson);
        const Embed = new MessageEmbed(JSONparse);
        
        return Embed;
    }
}

module.exports = Embed;