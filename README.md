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

## Jump to Pages (Table of Contents)

- [Setup](#setup)
  - [Create a Command](#commands)
  - [Status](#status) 
- [Member Leave Message](#memberleaveevent)
- [Member Join Message](#joinmessageevent)
- [Links](#links)

## Setup

```js 
const gydo = require("gydo.js-dev");
const bot = new gydo.config({
    // change the <token here> to your bots token, same with the prefix (you can only do one prefix yet)
    token: "<token here>",
    prefix: "<your prefix>"
});

bot.addIntents(262)
```

See Intents you need: <br />
(Important)
[See DJS v13 Intents](https://discordjs.guide/popular-topics/intents.html)

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

Since this is the Dev branch, there is unfortunately, no documentation for this, _yet._

### Status

```js 
bot.status("<status>", { type: "PLAYING" });
``` 
<br />

or a **Changing Status Loop** <br />
```js
bot.loopStatus(["<status>", "another one"], 1000, { type: "PLAYING" })
```
<br />

It must be on an Array, otherwise it'll send an error. <br />

The Second Argument (or the time) is in Miliseconds (1000 = 1 second), and you can't go below 1000 ms, or it'll send an error. <br />

Status Types are: <br />
`PLAYING`, `LISTENING`, `WATCHING`, and `STREAMING`

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

## Links
Report the bugs on our Discord Server!

[Gydo-JS Discord Server](https://discord.gg/s5UcwZTzKg)

[Main Branch](https://npmjs.com/package/gydo-js)

[Github Repo](https://github.com/Gydo-Team/gydo.js-dev)