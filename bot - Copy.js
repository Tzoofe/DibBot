const Discord = require('discord.js');
const bot = new Discord.Client();
const token = require('./settings.json').token
const inList = require('./insults.json').insults

bot.on('ready', () => {
    console.log("thats a nice meme")
})

bot.on('guildMemberAdd', member => {
    let guild = member.guild;
    guild.defaultChannel.send(member.user.username + ' is a dick!');
})

bot.on('guildMemberRemove', member => {
    let guild = member.guild;
    guild.defaultChannel.send(member.user.username + ' left lmao');
})

var prefix = "$"
bot.on('message', message => {
    if(!message.content.startsWith(prefix)) return;
    let args = message.content.split(' ').slice(1);
    var argresult = args.join(' ');
    if(message.author.bot) return;

    if(message.content.startsWith(prefix + "ping")) {
        message.channel.send("`" + bot.ping + "ms`");
    }else

    if(message.content.startsWith(prefix + 'ni')) {
        message.channel.send("ger");
    } else

    if(message.content.startsWith(prefix + 'setgame')) {
        bot.user.setGame(argresult);
    }else

    if(message.content.startsWith(prefix + 'setstatus')) {
        if(!argresult) argresult = 'online';
        bot.user.setStatus(argresult);
    }
    if(message.content.startsWith(prefix + 'insult')) {
        var rand = [
            'Happy Birthday!\nI hope you die of starvation in a wheelchair with 2 flat tires.',
            'You were born on a highway\ncause that\'s where most accidents happen',
            'You\'re a fucking gong farmer.\nLook it up.',
            'You\'re Autistic',
            'If I was as stupid as you I\'d try to kill myself by holding my breath!',
            'Your mother has accumulated so much mass that she has successfully created a closed timelike curve!'
        ];
        var randomSent = rand[Math.floor(Math.random() * rand.length)];
        if(!message.channel.id === "306148902938345473"){
            message.channel.send("Use the #insults Channel");
        }
        else
        if (message.channel.id === "306148902938345473") {
                message.channel.send(randomSent);
            }
        }
});

bot.login(token);
