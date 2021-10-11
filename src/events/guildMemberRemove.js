const client = require('../utils/client');

/**
 * Event for when a memeber leaves, and sends a message if specified
*/
class guildMemberRemove {
    constructor(channel, message) {
        if(!message) throw new Error(`NO_LEAVE_MESSAGE_GIVEN`);
            this.message = message;
            
        if(!channel) throw new Error(`NO_LEAVE_MESSAGE_CHANNEL`);
            
        if(typeof this.message !== 'string') throw new TypeError(`LEAVE_MESSAGE_NOT_STRING`);
            
        if(typeof channel !== 'string') throw new TypeError(`LEAVE_CHANNEL_NOT_VALID`);
        this.channel = channel;
            
        if(this.message == null) return
        if(this.channel == null) return
    
        client.on('guildMemberRemove', member => {
            const leaveChannel = member.guild.channels.cache.get(this.channel)
                
            const message = this.message
            .replaceAll("{member-tag}", member.user.tag)
            .replaceAll("{member-id}", member.user.id)
            .replaceAll("{guildname}", member.guild.name)
                
            leaveChannel.send(`${message}`)
        });
    }
}

module.exports = guildMemberRemove;