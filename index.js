const discord = require('discord.js');
const fs = require('fs');
const client = new discord.Client();

const main = require('./src/scripts/main');
const interpreter = require('./src/scripts/interpreter');

module.exports = main
// module.exports = MessageEvent

// Old Code
/*
const { TeamMember } = require('discord.js')
const Discord = require('Discord.js')
const Gydo = new Discord.Client()
const fs = require('fs')
const { pid } = require('process')
const client = new Discord.Client()

var config = (`{
    "prefix": "PUT PREFIX HERE",
    "token": "PUT TOKEN HERE",
}`)



//if (!fs.existsSync(`./../../setting.json`)) {
//fs.copyFile('./node_modules/gydo-js/settings.json', './../../setting.json', (err) => {
//  if (err) throw err;
// console.log(`No Settings Files making one now.`);
//});
//}

const path = './../../setting.json'

try {
  if (!fs.existsSync(`./../../setting.json`)) {
    const setup = require('./../../setting.json')
    } 
} catch(err) {
  console.error('No setting file making one now')
  let data = JSON.stringify(require('gydo-js/settings.json'), null, " ");   // '{\n "a": 2\n}));
 fs.writeFileSync(`setting.json`, data);
 process.kill(process.pid)
}


try {
  const setup = require('./../../setting.json')
} catch(err) {
  console.error('No setting file making one now')
  let data = JSON.stringify(require('./settings.json'), null, " ");   // '{\n "a": 2\n}));
 fs.writeFileSync(`setting.json`, data);
 process.kill(process.pid)
}

const setup = require('./../../setting.json')

if (setup.token === 'INPUT TOKEN') {
  console.log('No token has been put in setting.json please put one in')
  process.kill(process.pid)
}

if (setup.token === '') {
  console.log('No token has been put in setting.json please put one in')
  process.kill(process.pid)
}
if(setup.token === 'INPUT TOKEN') {
  console.log('No token has been put in setting.json please put one in')
  process.kill(process.pid)
}

if (setup.prefix === '') {
  console.log('No prefix has been put in setting.json please put one in')
  process.kill(process.pid)
}
if(setup.prefix === 'INPUT PREFIX') {
  console.log('No prefix has been put in setting.json please put one in')
  process.kill(process.pid)
}

client.login(setup.token)

client.on('ready', () => {
  console.log(`Bot ready and logged in as ${client.user.username}`)
})

//Ping Command

client.on('message', message => {
  if (setup.command1.enabled === 'yes') {
    if (setup.command1.name === '') return console.log('Command 1 needs a name'); 
    if (message.content === `${setup.prefix}${setup.command1.name}`) {
      var embed = new Discord.MessageEmbed()
      var ping = client.ws.ping
      var author = message.author
       
      var text = setup.command1.message
      var text2 = text.replace("{author}", `${message.author}`)
      var text3 = text2.replace("{ping}", `${client.ws.ping}`)
      var text4 = text3.replace("{server}", `${message.guild.name}`)
      var newtext = text4.replace("{memberCount}", `${message.guild.members.cache}`)

      message.channel.send(`${newtext}`)

      //var newtext = text3.replace(`{title:${inside}}`, ``)
      //if()
      //var inside = text.split("{title:")[1].split("}")[0]
      //embed.setTitle(`${inside}`)
      //if(embed) {
      //  message.channel.send(embed)}
      //
    }
  }
})

//MemberLogs 


client.on('guildMemberAdd', member => {
  if(setup.MemberLog.memberleavejoin === '') {console.log()}
  if(setup.MemberLog.memberleavejoin === 'CHANNEL ID') {console.log()}
  if(setup.MemberLog.serverid === '') {console.log()}
  if(setup.MemberLog.serverid === 'guildID') {console.log()}
  if(setup.MemberLog.JoinMessage === '') {console.log('Message Error. No message found in MemberLog: message field'); process.kill(process.pid)}
  const guildID = `${setup.MemberLog.serverid}`
  const channelID = `${setup.MemberLog.memberleavejoin}`;
  if(member.guild.id === guildID) {
     const channel = client.channels.cache.get(channelID);

     var text = setup.MemberLog.JoinMessage
     var text2 = text.replace("{author}", `${member}`)
     var text3 = text2.replace("{ping}", `${client.ws.ping}`)
     var text4 = text3.replace("{server}", `${member.guild.name}`)
     var newtext = text4.replace("{memberCount}", `${member.guild.members.cache.size}`)

channel.send(newtext);
  }
});

client.on('guildMemberRemove', member => {
  if(setup.MemberLog.memberleavejoin === '') {console.log()}
  if(setup.MemberLog.memberleavejoin === 'CHANNEL ID') {console.log()}
  if(setup.MemberLog.serverid === '') {console.log()}
  if(setup.MemberLog.serverid === 'guildID') {console.log()}
  const guildID = `${setup.MemberLog.serverid}`
  const channelID = `${setup.MemberLog.memberleavejoin}`;
  if(member.guild.id === guildID) {
     const channel = client.channels.cache.get(channelID);

channel.send(`Sad to see you leave ${member}.`);
  }
});
*/