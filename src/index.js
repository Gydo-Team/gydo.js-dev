module.exports = {
    // Main Classes/Functions
    config: require("./scripts/main"),
    ActivityManager: require("./managers/ActivityManager"),
    SlashCommandManager: require('./managers/SlashCommandManager'),
    Embed: require('./managers/Embed'),
    MessageUpdate: require('./events/MessageUpdate'),
    ClientError: require('./managers/ClientError'),
    interpreter: require('./scripts/interpreter'),
    EventsManager: require('./managers/EventsManager'),
};