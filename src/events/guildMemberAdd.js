const client = require('../utils/client');
const Util = require('../utils/util');

/**
 * Event for when a memeber leaves, and sends a message if specified
 */
class guildMemberAdd {
    constructor(channel, message) {
        if(!message) throw new Error(`NO_LEAVE_MESSAGE_GIVEN`)
        this.message = message
            
        if(!channel) throw new Error(`NO_LEAVE_MESSAGE_CHANNEL`);
            
        if(typeof this.message !== 'string') throw new TypeError(`LEAVE_MESSAGE_NOT_STRING`);
            
        if(typeof channel !== 'string') throw new TypeError(`LEAVE_CHANNEL_NOT_VALID`);
        this.channel = channel
    
        client.on('guildMemberAdd', member => {
            const welcomeChannel = member.guild.channels.cache.get(this.channel);
                
            const welcome = this.message
            .replaceAll("{member-tag}", member.user.tag)
            .replaceAll("{member}", Util.mention(member.user.id, "user"))
            .replaceAll("{guildname}", member.guild.name)
            .replaceAll("{member-id}", member.user.id)
            .replaceAll("{guild-member-count}", member.guild.memberCount)
                
    
            welcomeChannel.send(`${welcome}`)
        });
    }
}

module.exports = guildMemberAdd;