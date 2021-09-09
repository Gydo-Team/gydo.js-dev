/**
 * Client User
*/
class ClientUser {
    constructor(client) {
        /** 
         * Bot's ID
        */
        this.id = client.user.id;
        
        /** 
         * Bot's Tag (#0000)
        */
        this.tag = client.user.tag;
        
        this.discriminator = client.user.discriminator
        
        this.serverCount = client.guilds.cache.size;
        
        /**
         * Date of when the Bot was created
         * @returns {Date}
        */
        this.createdAt = client.user.createdAt;
    }
}

module.exports = ClientUser;