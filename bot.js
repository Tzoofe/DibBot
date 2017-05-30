const Discord = require('discord.js');
const bot = new Discord.Client();
const settings = require ('./settings.json');
const token = require('./settings.json').token
const inList = require('./insults.json').insults
const fs = require('fs');
const http = require('http');

let chamber = Math.floor(Math.random() * 6);

const commands = {
    'ping': (msg) => {
        msg.channel.send("`" + bot.ping + "ms`"); //sends the bot's ping to to servers
        console.log("Bot's ping is " + bot.ping + "ms");
    },


    'setgame': (msg, argresult) => {
        if (msg.member.hasPermission("MANAGE_GUILD") || msg.author.id === "203816413188718592") {
            bot.user.setGame(argresult);
            console.log("Game was set to " + argresult + " on " + msg.guild.name);
            msg.channel.send("fuck you stephanie");
        }else{
            msg.channel.send("no perms dude0");
        }
    },


    'ban': (msg, argresult) => {
        if (msg.member.hasPermission("BAN_MEMBERS") || msg.author.id === "203816413188718592") {
            msg.guild.channels.find("name", "log").send("`ayo " + argresult + " was banned by " + msg.author.username +"`");
            console.log("User " + argresult + " was banned on " + msg.guild.name);
            msg.guild.member(msg.mentions.users.first()).ban();
        }else {
            msg.channel.send("no perms dude0");
        }
    },


    'prune': (msg, argresult) => {
        if (msg.member.hasPermission("MANAGE_MESSAGES") || msg.author.id === "203816413188718592") {
            var number = parseInt(argresult) + 1;
            if (number <= 0) return;
            if (number == 1) {
                msg.channel.fetchMessages({limit: 1}).first().delete();
            } else {
                msg.channel.bulkDelete(number);
            }
        msg.channel.send("no perms dude0");
        }
    },


    'punish': (msg, argresult) => {
        if (msg.member.hasPermission("DEAFEN_MEMBERS") || msg.author.id === "203816413188718592") {
            msg.guild.member(message.mentions.members.first()).addRole("315945919877218306");
            msg.guild.channels.find("name", "log").send();
        }else {
            msg.channel.send("no perms dude0");
        }
    },


    'unpunish': (msg) => {
        if (msg.member.hasPermission("DEAFEN_MEMBERS") || msg.author.id === "203816413188718592") {
            msg.guild.member(msg.mentions.users.first()).removeRole("315945919877218306");
        }
    },

    'sinfo': (msg) => {
        const date = msg.guild.createdAt;
        const dateString = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() +" " + date.getHours() + ":" + date.getMinutes()
        if(msg.channel.type === "dm") {
            msg.edit("Must be a Guild channel!");
        }else {
            const embed = new Discord.RichEmbed()
                .setThumbnail(msg.guild.iconURL)
                .addField(":desktop: Server Name", msg.guild.name, true) //server name
                .addField(":shrug: Created on", dateString, true) //server creation date
                .addField(":couple: Channels on this guild", msg.guild.channels.size, true) //server channels size
                .addField(":joy: Members on this guild", msg.guild.memberCount, true)
                .addField(":globe_with_meridians: Region", msg.guild.region, true)
                .addField(":person_with_blond_hair: Owner", msg.guild.owner, true)
                .addField(":eggplant: ID", msg.guild.id, true)
                .addField(":thinking: Default channel", msg.guild.defaultChannel, true)
                .setColor("#AD2742")
                .setFooter("ayy lmao")
                msg.delete()
                .then(msg => console.log(`Deleted message from ${msg.author}`))
                .catch(console.error);
                msg.channel.sendEmbed(embed);
        }
    },

    'help': (msg) => {
        var thumb = settings.thumbnails;
        var randThumb = thumb[Math.floor(Math.random() * thumb.length)];
        //
        var colorK = settings.colors;
        var randColor = colorK[Math.floor(Math.random() * colorK.length)];
        const embed = new Discord.RichEmbed()
                .setThumbnail(randThumb)
                .setColor(randColor)
                .addField(":x: Bot's prefix:", "​", true)
                .addField("'$'​", "​", true)
                .addField("Ping", "Shows ping", true)
                .addField("Punish", "Mutes user across all channels", true)
                .addField("Kick", "Kicks the user from the server", true)
                .addField("Ban", "Bans the user from the servers", true)
                .addField("8ball", "Youll never know", true)
                .addField("Prune", "Delete messages", true)


        msg.channel.sendEmbed(embed);
    },


    'say': (msg, argresult) => {
        var msgs = msg.content;
        msg.channel.send(argresult);
    },


    '8ball': (msg, argresult) => {
        var answer = ['yes', 'no', 'idk', 'maybe', 'nah im good', 'fuck no', 'Hell naw'];
        var randAns = answer[Math.floor(Math.random() * answer.length)];
        msg.channel.send(randAns);
    },


    'kick': (msg, argresult) => {
        if (msg.member.hasPermission("KICK_MEMBERS") || msg.author.id === "203816413188718592") {
            msg.guild.channels.find("name", "log").send("`ayo " + argresult + " was kick by " + msg.author.username +"`");
            msg.guild.member(msg.mentions.users.first()).kick();
        }else {
            msg.channel.send("no perms dude0");
        }
    },


      'exec': (msg) => {
          if (msg.member.hasPermission("KICK_MEMBERS")){
              const embed = {
                  "title": "Welcome to Apple's Discord",
                  "description": " ",
                  "color": 0xB457E8,
                  "fields": [
                        {
                            "name": "Latest Announcment",
                            "value": "something will be here eventually"
                        },{
                            "name": "Rules",
                            "value": "**1.**  No Voice/Text/Reaction Spam.\n**2.** No Gore/Porn/Hardcore Racism.\n**3.** No Blank/Impersonating Names.\n**4.** No Personal Information/Pictures/Doxxing.\n**5.** No Discord Invite Links.\n**6.** No Punishment evasion.",
                            "inline": true
                        },{
                            "name": "Some Answers",
                            "value": "[uhm pm me ok]()",
                            "inline": true
                        },{
                            "name": "Server Emotes",
                            "value": "<:Thonkang:306169204065959937> <:thinkato:315117611052433408> <:thonkplant:315117655579164672> <:thbonk:315117688815091712> <:thinkms:315117745706500096> <:thinok:315541848527732737> <:thinkgasm:315541887274450945> <:dink:315541626321895435>",
                            "inline": true
                        },{
                            "name": "Invite Link",
                            "value": "https://discord.gg/XKQZ2nt",
                            "inline": true
                        }
                    ]
                  }
                  msg.channel.send({ embed });
              }
          }
  }
bot.on('ready', () => {
    console.log("thats a nice meme");
})

bot.on('guildMemberAdd', mem => {
  var welcomechan = mem.guild.channels.find('name', 'welcome');
  welcomechan.sendMessage("Welcome " + mem.user.username + " to " + mem.guild.name);
  mem.addRole("315535968595607553");
});

bot.on('message', msg => {
    if (msg.author.bot) return;
    var prefix = "$";
    let args = msg.cleanContent.split(' ').slice(1);
    var argresult = args.join(' ');
    if (!msg.content.startsWith(prefix)) return;
    if (commands.hasOwnProperty(msg.content.toLowerCase().slice(prefix.length).split(' ')[0])) commands[msg.content.toLowerCase().slice(prefix.length).split(' ')[0]](msg, argresult);
})
bot.login(token);

if (process.platform === "win32") {
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", function() {
        process.emit("SIGINT");
    });
}

process.on("SIGINT", function() {
    setTimeout(function() {
        process.exit();
    }, 1500);
});

process.on("unhandledRejection", (err) => {
    console.log("unhandled promise rejection: " + err.stack);
});
