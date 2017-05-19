const Discord = require('discord.js');
const bot = new Discord.Client();
const settings = require ('./settings.json');
const token = require('./settings.json').token
const inList = require('./insults.json').insults
const fs = require('fs');

let chamber = Math.floor(Math.random() * 6);

const commands = {
    'ping': (msg) => {
        msg.channel.send("`" + bot.ping + "ms`"); //sends the bot's ping to to servers
        console.log("Bot's ping is " + bot.ping + "ms");
    },
    'setgame': (msg, argresult) => {
        if (msg.member.hasPermission("MANAGE_GUILD") || msg.author.id === "203816413188718592") {
            bot.user.setGame(argresult);
            msg.guild.channels.find("name", "log").sendEmbed({
                color: 3447003,
                title: ':exclamation: Change was made!',
                description: 'nice',
                fields: [{
                    name: ':video_game: Game Change',
                    value: 'Game was set to **' + argresult + "** by " + msg.author.username
                }]
            })
            console.log("Game was set to " + argresult + " on " + msg.guild.name);
            msg.channel.send("fuck you stephanie");
        }else{
            msg.channel.send("no perms dude0");
        }
    },
    'ban': (msg, argresult) => {
        if (msg.member.hasPermission("BAN_MEMBERS") || msg.author.id === "203816413188718592") {
            msg.guild.channels.find("name", "log").sendEmbed({
                color: 3447003,
                title: ':exclamation: Change was made!',
                description: ':thumbsup::skin-tone-1:',
                fields: [{
                    name: ':x: User Banned',
                    value: 'User **' + argresult + "** banned by " + msg.author.username
                }]
            })
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
            if (number > 5) {
                if(!msg.guild.channels.find("name", "log")){
                    msg.channel.send("Please create a channel called 'log'");
                }
            msg.guild.channels.find("name", "log").sendEmbed({
                color: 3447003,
                title: ':exclamation: Change was made!',
                description: ':thumbsup::skin-tone-1:',
                fields: [{
                    name: ':x: ' + number + ' Messages Deleted',
                    value: 'User **' + msg.author.username + "** Pruned " + number + " messages on channel #" + msg.channel.name
                }]
            })
        } else {
            console.log("Deleted");
        }
    }else {
        msg.channel.send("no perms dude0");
    }

},
    'punish': (msg) => {
        if (msg.member.hasPermission("DEAFEN_MEMBERS") || msg.author.id === "203816413188718592") {
            msg.guild.member(msg.mentions.users.first()).addRole("306177632016531458");
        }else {
            msg.channel.send("no perms dude0");
        }
    },
    'unpunish': (msg) => {
        if (msg.member.hasPermission("DEAFEN_MEMBERS") || msg.author.id === "203816413188718592") {
            msg.guild.member(msg.mentions.users.first()).removeRole("306177632016531458");
        }
    },
    'help': (msg) => {
        msg.channel.sendEmbed({
            color: 13517556,
            title: ':exclamation: Current Commands',
            description: '===============',
            fields: [{
                name: '$ping',
                value: '*pong*'
            },
            {
                name: '$setgame',
                value: "Sets the bot's game\n*$setgame <Game Name>*"
            },
            {
                name: '$ban',
                value: 'Bans the Guild Member\n*$ban <@name>*'
            },
            {
                name: '$prune',
                value: 'Deletes previous messages\n*$prune <number>*'
            },
            {
                name: '$punish',
                value: 'Prevent a Guild Member from Talking\n*$punish <@name>*'
            },
            {
                name: '$unpunish',
                value: 'Allowes a Punished Guild Member To Talk\n*$unpunish <@name>*'
            },
            {
                name: '$8ball',
                value: 'Ask the magic 8Ball A Question!\n*$8ball <Question>*'
            },
            {
                name: '$insult',
                value: 'Fuck off'
            }]
        })
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
    /*'roulette': (msg) => {
        if(chamber-- <= 0) {
            chamber = Math.floor(Math.random() * 6);
            let shot = new Discord.RichEmbed();
            shot.setColor("#FF332C");
            if (msg.author.username === "Rabbit") {
                shot.addField(":exclamation: OwO", "A furry lept from the darkness and yiffed " + msg.author.username + " in the butt!", false);
            } else {
                shot.addField(":exclamation: BANG!", msg.author.username + " died", false);
            }
            shot.addField("Result:", "Punishment!", false);
            shot.addField("Time:", "30 seconds!");
            shot.setThumbnail(msg.author.avatarURL);
            msg.channel.sendEmbed(shot);
            utils.punish(msg.member);
            punished.set(msg.member.id, msg.member);
            setTimeout(function() {
                utils.unpunish(msg.member);
                punished.delete(msg.member.id);
            }, 60000);
        } else {
            var live = settings.rouletteLive;
            var liveSelect = live[Math.floor(Math.random() * live.length)];
            if (msg.author.username === "Rabbit") {
                var furry = settings.rouletteFurry;
                liveSelect += " " + furry[Math.floor(Math.random() * furry.length)];
            }
            msg.channel.send("`" + liveSelect + "`");
        }
    },
    */
    /*'kick': (msg) => {
        var userN = msg.mentions.users;
        if(msg.member.hasPermission("KICK_MEMBERS")) {
         {
            msg.guild.member.kick(userN.first());
            msg.channel.send("User " + userN.first() + " kicked");
        }
        }else {
          msg.channel.send(":octagonal_sign: No Permissions.");
        }
},*/
}

bot.on('ready', () => {
    console.log("thats a nice meme");
})

bot.on('guildMemberAdd', mem => {
  var welcomechan = mem.guild.channels.find('name', 'welcome');
  welcomechan.sendMessage("Welcome " + mem.user.username + " to " + mem.guild.name);
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
    //punished.forEach(function(member) {
        //utils.unpunish(member);
    //});
    setTimeout(function() {
        process.exit();
    }, 1500);
});

process.on("unhandledRejection", (err) => {
    console.log("unhandled promise rejection: " + err.stack);
});
