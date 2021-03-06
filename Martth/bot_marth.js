//here we go spaghetti code!

const Discord = require('discord.js');
const bot = new Discord.Client();
const utils = require('./utils.js');
const settings = require('./settings.json');
const token = settings.token;
const inList = require('./insults.json').insults;

let chamber = Math.floor(Math.random() * 6);
const moderatorRoles = settings.moderatorRoles;
const punishedRole = settings.punishedRole;

let punished = new Map();

const commands = {
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
                value: 'Very rude insults'
            },
            {
                name: '$roulette',
                value: 'Google it, nerd'
            }]
        })
    },
    'ping': (msg) => {
        msg.channel.send("`" + bot.ping + "ms`"); //sends the bot's ping to to servers
        console.log("Bot's ping is " + bot.ping + "ms");
    },
    'setgame': (msg, argresult) => {
        /*msg.guild.channels.find("name", "log").sendEmbed({
            color: 3447003,
            title: ':exclamation: Change was made!',
            description: 'nice',
            fields: [{
                name: ':video_game: Game Change',
                value: 'Game was set to **' + argresult + "** by " + msg.author.username
            }]
        })*/
        if (msg.member.hasPermission("MANAGE_MESSAGES")) {
            bot.user.setGame(argresult);
            console.log("Game was set to " + argresult + " on " + msg.guild.name);
        }
    },
    'ban': (msg, argresult) => {
        /*msg.guild.channels.find("name", "log").sendEmbed({
            color: 3447003,
            title: ':exclamation: Change was made!',
            description: ':thumbsup::skin-tone-1:',
            fields: [{
                name: ':x: User Banned',
                value: 'User **' + argresult + "** banned by " + msg.author.username
            }]
        })*/
        if (msg.member.hasPermission("BAN_MEMBERS")) {
            msg.guild.member(msg.mentions.users.first()).ban();
            console.log("User " + argresult + " was banned on " + msg.guild.name);
        }
    },
    'prune': (msg, argresult) => {
        if (msg.member.hasPermission("MANAGE_MESSAGES")) {
            var number = parseInt(argresult) + 1;
            if (number <= 0) return;
            if (number == 1) {
                msg.channel.fetchMessages({limit: 1}).first().delete();
            } else {
                msg.channel.bulkDelete(number);
            }
            /*if (number > 5) {
                msg.guild.channels.find("name", "log").sendEmbed({
                    color: 3447003,
                    title: ':exclamation: Change was made!',
                    description: ':thumbsup::skin-tone-1:',
                    fields: [{
                        name: ':x: ' + number + ' Messages Deleted',
                        value: 'User **' + msg.author.username + "** Pruned " + number + " messages on channel #" + msg.channel.name
                    }]
                })
            }*/
        } else {
            console.log("Deleted");
        }
    },
    'punish': (msg) => {
        if (msg.member.hasPermission("DEAFEN_MEMBERS")) {
            utils.punish(msg.guild, msg.mentions.users.first());
        }
    },
    'unpunish': (msg) => {
        if (msg.member.hasPermission("DEAFEN_MEMBERS")) {
            utils.unpunish(msg.guild, msg.mentions.users.first());
        }
    },
    'say': (msg, argresult) => {
        var msgs = msg.content;
        msg.channel.send(argresult);
    },
    '8ball': (msg, argresult) => {
        var answer = ['yes', 'no', 'idk', 'could be', 'nah im good', 'nah', 'ofc dude'];
        var randAns = answer[Math.floor(Math.random() * answer.length)];
        msg.channel.send(randAns);
    },
    'insult': (msg) => {
        var rand = settings.insults;
        var randomSent = rand[Math.floor(Math.random() * rand.length)];
        msg.channel.send(randomSent);
    },
    'roulette': (msg) => {
        if(chamber-- <= 0) {
            chamber = Math.floor(Math.random() * 6);
            let shot = new Discord.RichEmbed();
            shot.setColor("#FF332C");
            if (msg.author.username === "Rabbit") {
                shot.addField(":exclamation: OwO", "A furry lept from the darkness and yiffed " + msg.author.username + " in the butt!", false);
            } else {
                shot.addField(":exclamation: BANG!", msg.author.username + " got shot!", false);
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
            msg.channel.send(liveSelect);
        }
    }


}

bot.on('ready', () => {
    console.log("thats a nice meme");
})

bot.on('message', msg => {
    if (msg.author.bot) return;
    var prefix = "$";
    let args = msg.content.split(' ').slice(1);
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
    punished.forEach(function(member) {
        utils.unpunish(member);
    });
    setTimeout(function() {
        process.exit();
    }, 1500);
});

process.on("unhandledRejection", (err) => {
    console.log("unhandled promise rejection: " + err.stack);
});
