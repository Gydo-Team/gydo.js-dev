[33mtag v1.0.0[m
Tagger: loldonut <ricricramisogaming18@gmail.com>
Date:   Thu Sep 9 20:36:16 2021 +0800

Update v1.0.0

[33mcommit 2b222b59d585d48c83237170c68615b4fa806c56[m[33m ([m[1;33mtag: v1.0.0[m[33m)[m
Author: loldonut <ricricramisogaming18@gmail.com>
Date:   Tue Aug 31 11:37:20 2021 +0800

    Updated to DJS v13

[1mdiff --git a/src/scripts/interpreter.js b/src/scripts/interpreter.js[m
[1mindex 9f0dc5a..45008b2 100644[m
[1m--- a/src/scripts/interpreter.js[m
[1m+++ b/src/scripts/interpreter.js[m
[36m@@ -1,15 +1,12 @@[m
 const fs = require("fs");[m
[31m-const discord = require("discord.js")[m
[32m+[m[32mconst discord = require("discord.js");[m
 [m
 const interpreter = async (client) => {[m
[31m-    //let funcs = fs.readdirSync("../funcs").filter(file => file.endsWith('.js'))[m
[31m-    [m
[31m-    // Bots Prefix[m
     const s = client.botprefix.get("prefix")[m
     const prefix = `${s}`[m
     [m
 [m
[31m-    client.on("message", message => {[m
[32m+[m[32m    client.on("messageCreate", message => {[m
         const args = message.content.slice(prefix.length).trim().split(/ +/);[m
         const command = args.shift().toLowerCase();[m
         [m
[36m@@ -31,11 +28,11 @@[m [mconst interpreter = async (client) => {[m
         .split("{bot-user-id}").join(`${client.user.id}`)[m
         .split("{guildname}").join(`${message.guild.name}`)[m
     [m
[31m-        // Executing the Command[m
[32m+[m[32m        // Trying to send a message with a Try-Catch block[m
         try {[m
             if(command === client.commands.get(command)) {[m
[31m-                message.channel.send(res, {[m
[31m-                    embed: embed || null[m
[32m+[m[32m                message.channel.send({[m
[32m+[m[32m                    content: res[m
                 });[m
             }[m
         } catch (err) {[m
[36m@@ -44,4 +41,4 @@[m [mconst interpreter = async (client) => {[m
     });[m
 }[m
 [m
[31m-module.exports = interpreter[m
\ No newline at end of file[m
[32m+[m[32mmodule.exports = interpreter;[m
\ No newline at end of file[m
[1mdiff --git a/src/scripts/main.js b/src/scripts/main.js[m
[1mindex 278a804..4dc53b1 100644[m
[1m--- a/src/scripts/main.js[m
[1m+++ b/src/scripts/main.js[m
[36m@@ -2,7 +2,7 @@[m
 const discord = require('discord.js');[m
 const { Intents, Client } = require("discord.js");[m
 const client = new Client({[m
[31m-    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS][m
[32m+[m[32m    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENSES][m[41m[m
 });[m
 const fs = require("fs");[m
 const chalk = require("chalk");[m
[36m@@ -44,7 +44,7 @@[m [mclass config {[m
         client.botprefix.set("prefix", this.prefix)[m
 [m
         client.login(this.token);[m
[31m-        client.on('ready', async () => {[m
[32m+[m[32m        client.once('ready', async () => {[m[41m[m
             console.log(chalk.red(`Bot is Ready! | Logged in as ${client.user.tag}`))[m
         });[m
 [m
[36m@@ -150,39 +150,6 @@[m [mclass config {[m
             }, time);[m
         });[m
     }[m
[31m-[m
[31m-    /**[m
[31m-     * Sends a Discord Embed[m
[31m-     * @example bot.embed({[m
[31m-         title: "Example",[m
[31m-     })[m
[31m-     */[m
[31m-    embed(emb) {[m
[31m-        let embed = new discord.MessageEmbed()[m
[31m-        [m
[31m-        if(!emb.title) throw new Error(`NO_EMBED_TITLE`);[m
[31m-        [m
[31m-        embed.addField(emb.title)[m
[31m-        if(emb.desc) {[m
[31m-            embed.setDescription(emb.desc)[m
[31m-        }[m
[31m-        [m
[31m-        if(emb.author) {[m
[31m-            embed.setAuthor(emb.author, emb.authorurl)[m
[31m-        }[m
[31m-        [m
[31m-        if(emb.footer) {[m
[31m-            embed.setFooter(emb.footer, emb.footerurl)[m
[31m-        }[m
[31m-        [m
[31m-        embed.setColor(emb.color)[m
[31m-        [m
[31m-        if(emb.timestamp == true) {[m
[31m-            embed.setTimestamp()[m
[31m-        }[m
[31m-        [m
[31m-        client.embed.set(this.cmdname, embed)[m
[31m-    }[m
 }[m
 [m
 exports.config = config;[m
\ No newline at end of file[m
