const Discord = require('discord.js');
const bot = new Discord.Client();
const token = require('./settings.json').token
const inList = require('./insults.json').insults

let chamber = Math.floor(Math.random() * 6);
const adminrole = ['255771783167213568', '213901526920462337']

const commands = {
    'ping': (msg) => {
        msg.channel.send("`" + bot.ping + "ms`"); //sends the bot's ping to to servers
        console.log("Bot's ping is " + bot.ping + "ms");
    },
    'setgame': (msg, argresult) => {
        bot.user.setGame(argresult);
        /*msg.guild.channels.find("name", "log").sendEmbed({
            color: 3447003,
            title: ':exclamation: Change was made!',
            description: 'nice',
            fields: [{
                name: ':video_game: Game Change',
                value: 'Game was set to **' + argresult + "** by " + msg.author.username
            }]
        })*/

        console.log("Game was set to " + argresult + " on " + msg.guild.name);
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
        console.log("User " + argresult + " was banned on " + msg.guild.name);
        msg.guild.member(msg.mentions.users.first()).ban();
    },
    'prune': (msg, argresult) => {
        if(msg.member.role.has(adminrole)){
            var number = parseInt(argresult);
            if (number <= 0) return;
            if (number == 1) {
                msg.channel.fetchMessages({limit: 1}).first().delete();
            } else {
                msg.channel.bulkDelete(number);
            }
            //if (number > 5) {
                /*msg.guild.channels.find("name", "log").sendEmbed({
                    color: 3447003,
                    title: ':exclamation: Change was made!',
                    description: ':thumbsup::skin-tone-1:',
                    fields: [{
                        name: ':x: ' + number + ' Messages Deleted',
                        value: 'User **' + msg.author.username + "** Pruned " + number + " messages on channel #" + msg.channel.name
                    }]
                })*/
            }
            else{
                msg.channel.send('no perms dude.');
            }
        } else {
            console.log("Deleted");
        }

    },
    'punish': (msg) => {
        if(msg.member.role.has("255771783167213568" || "213901526920462337")){
            msg.guild.member(msg.mentions.users.first()).addRole("306514370739830785");
        }
    },
    'unpunish': (msg) => {
        if(msg.member.role.has("255771783167213568" || "213901526920462337")){
            msg.guild.member(msg.mentions.users.first()).removeRole("306514370739830785");
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
            },
            {
                name: '$roulette',
                value: 'fuckin guess.'
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
    'insult': (msg) => {
        var rand = [
            'Happy Birthday!\nI hope you die of starvation in a wheelchair with 2 flat tires.',
            'You were born on a highway\ncause that\'s where most accidents happen',
            'You\'re a fucking gong farmer.\nLook it up.',
            'You\'re Autistic',
            'If I was as stupid as you I\'d try to kill myself by holding my breath!',
            'Your mother has accumulated so much mass that she has successfully created a closed timelike curve!'
        ];
        var randomSent = rand[Math.floor(Math.random() * rand.length)];
        if(!msg.channel.id === "306148902938345473"){
            msg.channel.send("Use the #insults Channel");
        }
        else
        if (msg.channel.id === "306148902938345473") {
                msg.channel.send(randomSent);
            }
    },
    'roulette': (msg) => {
        if(chamber-- <= 0) {
            chamber = Math.floor(Math.random() * 6);
            var kill = ["You got shot, you get fucked.", "lmao get rekt", "\"omg die\" -Rabbit (you died)", "The bullet missed you, but you panicked and died.", "A furry leaps from the darkness and yiffs you in the butt!"];
            var killSelect = kill[Math.floor(Math.random() * kill.length)];
            msg.channel.send(killSelect);
        } else {
            var live = ["Wew, you lived!" , "You are dumb and aimed the gun backwards, the bullet hit Marth instead of you.", "You pull the trigger, but the revolver jams. You live to see another day.", "You pulled the trigger gun malfunctioned, count your blessings", "You didn't get shot :FeelsBetrayedMan: try again my dude."];
            var liveSelect = live[Math.floor(Math.random() * live.length)];
            msg.channel.send(liveSelect);
        }
    }


}

bot.on('ready', () => {
    console.log("thats a nice meme");
})

bot.on('message', msg => {
    var prefix = "$";
    let args = msg.content.split(' ').slice(1);
    var argresult = args.join(' ');
    if (!msg.content.startsWith(prefix)) return;
    if (commands.hasOwnProperty(msg.content.toLowerCase().slice(prefix.length).split(' ')[0])) commands[msg.content.toLowerCase().slice(prefix.length).split(' ')[0]](msg, argresult);
})
bot.login(token);
