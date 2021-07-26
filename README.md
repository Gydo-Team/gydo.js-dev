# Gydo.JS (Gydo-JS) Dev Branch

![npm](https://img.shields.io/npm/v/gydo.js-dev?color=%23acff00&label=gydo.js-dev&logo=npm)
![Discord](https://img.shields.io/discord/823028211075383316?label=Gydo-JS%20Server&logo=discord)

The Dev branch of Gydo-JS
(Unstable Branch)

It will probably receive quite lots of updates, but it will be unstable. Report bugs in our [Discord Server](https://discord.gg/s5UcwZTzKg)

[Main Branch](https://npmjs.com/package/gydo-js)

## Setup

```js 
const gydo = require("gydo.js-dev");
const bot = new gydo({
    // change the <token here> to your bots token, same with the prefix (you can only do one prefix yet)
    token: "<token here>",
    prefix: "<your prefix>"
});

bot.ping() 

// a simple ping command (e.g `?ping` depends on what your prefix is)

bot.banMember() 

// bans a member stated if the user has permissions to ban

bot.kickMember()

// kicks a member stated if the user has permission to kick

```

Ban Example: <br />
`?ban 1837382938293919 no`

This will depend on your prefix <br />

If you have for example `!` then It's like this: <br />
`!ban`

## Creating a command

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
bot.cmd("<cmd name>", "<code>")
```
<br />

Every command will start with your prefix like `?ping` <br />

**Example Command:**
<br />
```js
bot.cmd("ping", "Pong! ({ping}ms)")
```
**Functions:**
<br />
`{ping}` - Sends the Bot's ping <br />

`{message-author-tag}` - Sends the tag of the user who sent/ran the command <br />

`{message-author-id}` - Sends the ID of the User who ran the command <br /> 

`{bot-user-tag}` - Sends the tag of your Bot <br />

`{bot-user-id}` - Sends the ID of your Bot <br />

Since this is the Dev branch, there is unfortunately, no documentation for this, _yet._

### Status

```js 
bot.status({
    status: "<status here>",
    type: "PLAYING"
});
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
    message: "Sad to see you leave %member",
    // put any message you want
    channel: "<CHANNEL ID>",
    default: false
});
```

Functions: <br />
`%member` returns the members tag <br />
`%guildname` returns the Guilds name <br />


If the `default` is set to true, It will ignore the custom message and will send this one instesd: `Sad to see you leave MemberTag#0001` <br />


If set to false it will ignore the default message and will send the custom one. <br />

More Functions soon 

### Join Message Event

```js
bot.guildMemberAdd({
    // put any message here
    message: "%memberTag Welcome to %guildname!",
    channel: "<channel ID>"
});
```

Functions: <br />
`%member` - Mentions the member that just joined <br />
`%guildname` - Returns the Guild's name <br />
`%memberid` - Returns the member's id <br />
`%guildMemberCount` - Returns the Guild's Member Count (Will Include Bots)

# Client 

(WARNING: ON BETA, Functions might not be able to work, yet.) <br />

**Clients Ping (Must have the Basic Setup for the bot)** <br />


`const client = new gydo.Client` <br />

Client Functions: <br />
`client.ping` returns the bots ping. <br />
`client.guildJoinedSize` returns a number of how many guilds your bot are in. <br />

## Link(s)
Report the bugs on our Discord Server! <br />

[Gydo-JS Discord Server](https://discord.gg/s5UcwZTzKg)