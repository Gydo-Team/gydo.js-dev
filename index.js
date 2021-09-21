const main = require('./src/scripts/main');

module.exports = {
    config: require("./src/scripts/main"),
    Activity: require("./src/classes/Activity"),
    SlashCommand: require('./src/classes/SlashCommand'),
    Embed: require('./src/classes/Embed')
};