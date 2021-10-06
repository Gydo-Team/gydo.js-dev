<div align="center">
  <br />
  <p>
    <a href="https://discord.gg/s5UcwZTzKg"><img src="https://img.shields.io/discord/823028211075383316?label=Gydo-JS%20Server&logo=discord" alt="Discord Server"/></a>
    <a href="https://npmjs.com/package/gydo.js-dev"><img src="https://img.shields.io/npm/v/gydo.js-dev?color=%23acff00&label=gydo.js-dev&logo=npm" alt="npm gydo" />
  </p>
  <br />
</div>

# Gydo.JS (Gydo-JS) Dev Branch

The Dev branch of Gydo-JS
(Unstable Branch)

It will probably receive quite lots of updates, _but it will be unstable._ Report bugs in our [Discord Server](https://discord.gg/s5UcwZTzKg)

Stable Version: [Main Branch](https://npmjs.com/package/gydo-js)

[Github Repo](https://github.com/Gydo-Team/gydo.js-dev)

## Table of Contents

- [Setup](#setup)
  - [Create a Command](#commands)
  - [Command Handler](#command-handler)
  - [Slash Commands](#slash-commands)
  - [Client Error](#clienterror)
  - [Embeds](#embeds)
  - [Status](#status) 
- [Member Leave Message](#member-leave-event)
- [Member Join Message](#join-message-event)
- [Message Update](#message-update)
- [Contributing](#contributing)
- [Links](#links)

## Setup

```js 
const gydo = require("gydo.js-dev");
const bot = new gydo.config({
    // change the <token here> to your bots token, same with the prefix (you can only do one prefix yet)
    token: "<token here>",
    prefix: "<your prefix>"
});

```

You will automatically have this intents:
`GUILDS`
`GUILD_MESSAGES`

Which is enough, and what is required.

Once you've completed the setup, you can run `node .` (or `node <filename>.js`) in your terminal to run the bot.

## Commands

**If you encounter any bugs, please report it to our** [Discord Server](https://discord.gg/s5UcwZTzKg)
<br />

**Before you put any commands put:**
<br />
```js
bot.MessageDetect()
```
<br />

For the command to **actually work**
(Make sure to put it above the commands)
<br />

To create a command do: <br />
```js
bot.cmd({
    name: "<cmd name>", 
    code: "<code>"
});
```
<br />

Every command will start with your prefix like `?ping` <br />

**Example Command:**
<br />
```js
bot.cmd({ 
    name: "ping",
    code: "Pong! ({ping}ms)"
});
```
**Functions:**
<br />
`{ping}` - Sends the Bot's ping <br />

`{message-author-tag}` - Sends the tag of the user who sent/ran the command <br />

`{message-author-id}` - Sends the ID of the User who ran the command <br /> 

`{bot-user-tag}` - Sends the tag of your Bot <br />

`{bot-user-id}` - Sends the ID of your Bot <br />

`{guildname}` - Sends the Guild's name <br />

**Args**

`{args;<num>}`

You can replace `<num>` with a number.

Example: 

Code: `{args;0}` <br />
Message sent by user: "!example gydo" <br />
Output: `gydo` <br />

Raw Args Output: `["gydo"]`

Since this is the Dev branch, there is unfortunately, no documentation for this, _yet._

### Command Handler

Baisc Command Handler Example:

```js
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    
    bot.cmd(command);
}
```

## Slash Commands

Make sure your bot has the permission to create slash commands 

Simple Ping Slash Command:
```js
bot.slashCommand.create({
    name: "ping",
    description: "a simple ping command",
    code: "pong",
    // optional
    guildId: "1234567890"
});
```

You can also put `{ping}` inside `code: ""` to get the bots ping.

If you want your slash command to only be created on a specific server, then you can put the server's guild ID in `guildId`

If you want it so only the user who created the interaction can see it, add the property in `slashCommand.create({})`: `ephemeral: true`

To detect the slash command: <br />
```js
bot.slashCommand.detect("ping")
```

You will have to do `bot.slashCommand.detect("<slashCommandName>")` to detect the slash commands you've created, otherwise the bot will say `"interaction failed"`

## ClientError

`ClientError` _**extends**_ [EventEmitter](https://nodejs.org/api/events.html)

```js
const { ClientError } = require('gydo.js-dev');

const ClientErr = new ClientError();

ClientErr.on('error', error => {
    console.error(error);
});
```

## Embeds

To make an embed:

You will first have to specify on what command should the embed be attached on. It'll automatically attached on a command, if you have put one, and does exist.


All things you could add in the embed's property is mentioned here:

```js
new gydo.Embed("<any of your command name>", {
    title: "Embed Title",
    author: "Embed Author",
    authorURL: "<some URL here>",
    description: "Embed Description \n [Hyper Link](https://npmjs.com/package/gydo.js-dev/)",
    footer: "Embed Footer",
    // (You can add more than 2 fields)
    fields: [
        {
            name: "First Field",
            value: "First Field Value",
            // Optional
            inline: true
        },
        {
            name: "Second Field",
            value: "Second Field Value"
        }
    ],
    color: "RANDOM",
    timestamp: true
});
```

### Status

```js 
bot.activity.setActivity("<status>", { type: "PLAYING" });
``` 
<br />

or a **Changing Status Loop** <br />
```js
bot.activity.loopStatus(["<status>", "another one"], 1000, { type: "PLAYING" })
```
<br />

It must be on an Array, otherwise it'll send an error. <br />

The Second Argument (or the time) is in Miliseconds (1000 = 1 second), and you can't go below 1000 ms, or it'll send an error. <br />

Status Types are: <br />
`PLAYING`, `LISTENING`, `WATCHING`, and `STREAMING`

**You can also do just a normal status:**

```js
bot.activity.setUserStatus('idle');
```

Normal Status Types are:

`idle` (Idle)
`dnd` (Do not Disturb)
`invisible` (Invisible)
`online` (Online)

### Member Leave Event

```js
bot.guildMemberRemove({
    message: "Sad to see you leave {member-tag}",
    // put any message you want
    channel: "<CHANNEL ID>"
});
```

Functions: <br />
`{member-tag}` - Returns the member's tag <br />

`{member-id}` - Returns the member's ID <br />

`{guildname}` - Returns the Guild's name <br />

### Join Message Event

```js
bot.guildMemberAdd({
    // put any message here
    message: "{member-tag} Welcome to {guildname}!",
    channel: "<channel ID>"
});
```

Functions: <br />
`{member-tag}` - Return the member's tag

`{member}` - Mentions the member that just joined

`{guildname}` - Returns the Guild's name

`{member-id}` - Returns the member's id

`{guild-memmber-count}` - Returns the Guild's Member Count (Will Include Bots)

# Message Update

`MessageUpdate` _**extends**_ [Base](https://discord.js.org/#/docs/main/stable/class/Base)

**Example:**

```js
bot.MessageUpdate({
    channel: "<CHANNEL_ID>",
    message: "<MESSAGE>"
});
```

**Functions:**

`{oldMessage}` - Old Message Content _before_ the message were updated

`{newMessage}` - New Message Content _after_ the message were updated

`{message.author.id}` - Message Author's ID

`{message.author.tag}` - Message Author's User Tag

`{message.author.mention}` - Mentions the Message Author

`{message.channel}` - the Channel the message was sent on by the author

## Contributing

You can contribute on gydo.js dev branch by making a pull request on our [GitHub Repository](https://github.com/Gydo-Team/gydo.js-dev)

[See Contributing Guide](https://github.com/Gydo-Team/gydo.js-dev/blob/main/docs/CONTRIBUTING.md)

...and Thanks for Contributing!

## Links
Report the bugs on our Discord Server, and/or to our GitHub Repository.

[Gydo-JS Discord Server](https://discord.gg/s5UcwZTzKg)

[Main Branch](https://npmjs.com/package/gydo-js)

[Github Repo](https://github.com/Gydo-Team/gydo.js-dev)