const guildMemberAdd = async (client, va) => {
    if(!va.message) throw new Error(`NO_LEAVE_MESSAGE_GIVEN`)
        this.message = va.message
        
        if(!va.channel) throw new Error(`NO_LEAVE_MESSAGE_CHANNEL`);
        
        if(typeof this.message !== 'string') throw new Error(`LEAVE_MESSAGE_NOT_STRING`);
        
        if(typeof va.channel !== 'string') throw new Error(`LEAVE_CHANNEL_NOT_VALID`);
        this.channel = va.channel
        
        if(this.message.length < 1) throw new Error(`NO_LEAVE_MESSAGE_GIVEN`);
        
        if(this.channel.length < 1) throw new Error(`NO_LEAVE_CHANNEL_ID_GIVEN`)
        
        if(this.message == null) return
        if(this.channel == null) return


        if(typeof va.channel !== 'number') return console.error(`Put a valid Channel ID!`)
        client.on('guildMemberAdd', member => {
            const welcomeChannel = member.guild.channels.cache.get(this.channel);
            
            const welcome = this.message
            .split("{member-tag}").join(`${member.user.tag}`)
            .split("{member}").join(`<@!` + `${member.user.id}` + `>`)
            .split("{guildname}").join(`${member.guild.name}`)
            .split("{member-id}").join(`${member.user.id}`)
            .split("{guild-member-count}").join(`${member.guild.memberCount}`)
            

        welcomeChannel.send(`${welcome}`)
    });
}

module.exports = guildMemberAdd;