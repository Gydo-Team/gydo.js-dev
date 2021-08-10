/**
 * Event for when a memeber leaves, and sends a message if specified
 * @param {String<message>} message 
 * Channel for the bot to send the message in.
 * @param {String<channel>} channel
 * Returns the message put/specified, and sends it to the channel.
 * @returns {String<message>} welcomeMSG
*/
const guildMemberRemove = async (client, va) => {
    if(!va.message) throw new Error(`NO_LEAVE_MESSAGE_GIVEN`)
        this.message = va.message
        
    if(!va.channel) throw new Error(`NO_LEAVE_MESSAGE_CHANNEL`);
        
    if(typeof this.message !== 'string') throw new Error(`LEAVE_MESSAGE_NOT_STRING`);
        
    if(typeof va.channel !== 'string') throw new Error(`LEAVE_CHANNEL_NOT_VALID`);
        this.channel = va.channel
        
        if(this.message == null) return
        if(this.channel == null) return

        client.on('guildMemberRemove', member => {
            const leaveChannel = member.guild.channels.cache.get(this.channel)
            
            if(va.default == true) {
                leaveChannel.send(`Sad to see you leave ${member.user.tag}`)
                return;
            }
            
            const message = this.message
            .split("{member-tag}").join(`${member.user.tag}`)
            .split("{member-id}").join(`${member.user.id}`)
            .split("{guildname}").join(`${member.guild.name}`)
            
        leaveChannel.send(`${message}`)
    });
}

module.exports = guildMemberRemove;