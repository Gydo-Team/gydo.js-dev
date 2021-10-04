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

/**
* Discord Message Embed
*/
class Embed {
    /** 
     * @typedef {object} IEmbed
     * @property {string} [title]
     * @property {string} [author]
     * @property {string} [authorURL]
     * @property {string} [description]
     * @property {string} [footer]
     * @property {IEmbedFields[]} [fields]
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
        
        if (cmd) this.cmd = cmd
        
        if (title) this.embedTitle = title
        else this.embedTitle = null;
        
        if (description) this.embedDesc = description
        else this.embedDesc = null;
        
        if (footer) this.embedFooter = footer
        else this.embedFooter = null;
        
        if (fields) this.embedFields = fields
        else this.embedFields = null;
        
        if (color) this.embedColor = color
        else this.embedColor = null;
        
        if (timestamp) this.embedTimestamp = timestamp
        else this.embedTimestamp = null;
        
        if (author) this.embedAuthor = author
        else this.embedAuthor = null;
        
        if (authorURL) this.embedAuthorURL = authorURL
        else this.embedAuthorURL = null;
        
        // SaveEmbed(EmbedRaw, cmd);
        client.embedTitle.set(cmd, title);
        client.embedDesc.set(cmd, description);
        client.embedFooter.set(cmd, footer);
        client.embedFields.set(cmd, fields);
        client.embedColor.set(cmd, color);
        client.embedTimestamp.set(cmd, timestamp);
        client.embedAuthor.set(cmd, author);
        client.embedAuthorURL.set(cmd, authorURL);
        client.embedCMDList.set(`${prefix}${this.cmd}`, this.cmd)
    }
    
    /** 
     * Turns a Raw JSON Embed to Embed
     * @returns {MessageEmbed}
    */
    static JSONtoEmbed(rawjson) {
        const JSONparse = JSON.parse(rawjson);
        const Embed = new MessageEmbed(JSONparse);
        
        return Embed;
    }
    
    /**
    * Returns an Object of your Embed's properties
    * @returns {Object}
    */
    toJSON() {
        return {
            title: this.embedTitle,
            description: this.embedDesc,
            footer: this.embedFooter,
            fields: this.embedFields,
            color: this.embedColor,
            timestamp: this.embedTimestamp,
            author: this.embedAuthor,
            authorURL: this.embedAuthorURL
        }
    }
}

module.exports = Embed;