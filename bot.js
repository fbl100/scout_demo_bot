// load the Discord Javascript library
const Discord = require('discord.js');
// load the filesystem library (for looking up memes)
const fs = require('fs')

// create a client
const client = new Discord.Client();

// channels to moderate
const channels = new Set()

/** 
 * Register the 'ready' event
*/
client.once('ready', () => { 

    const server = client.guilds.cache.find(guild => guild.name == 'Troop966')
    const botChannel = server.channels.cache.find(channel => channel.name == 'bots')

    console.log(`Found server: ${server.name} and #bot channel ${botChannel.name}`)
    channels.add(botChannel)

    console.log("Connected as " + client.user.tag)

    // Print out the server and channel info
    // console.log("Servers:") 
    // client.guilds.resolve()
    // client.guilds.cache.forEach( (guild) => {
    //     console.log(" - " + guild.name)
    //         guild.channels.cache.forEach( (channel) => {
    //         console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
    //     })
    // })

    
    botChannel.send(`Hello Troop 966, I am now in the #${botChannel.name} channel`)

});

client.on('message', (receivedMessage) => {

    // is this a channel we're moderating?
    if(channels.has(receivedMessage.channel) == false) {
        // if not, bail
        return;
    }

    // always give a thumbs up, it's polite
    receivedMessage.react('👍')

    // check for darn curse words
    moderateMessage(receivedMessage)

    // if the user wants to play magic 8-ball, go for it
    if(receivedMessage.content.startsWith("!marvin-8ball")) {
        process8BallCommand(receivedMessage)
        return
    }


});

/**
 * 
 * @param {Discord.Message} receivedMessage 
 */
function moderateMessage(receivedMessage)
{
    var curseWords = new Set(['darn', 'shoot', 'shucks', 'pudding'])
    for(let word of curseWords) {
        if(receivedMessage.content.includes(word)) {
            postRandomMeme(receivedMessage.channel)
            receivedMessage.delete()
            break
        }
    }

}


/**
 * 
 * @param {Discord.Channel} channel 
 */
function postRandomMeme(channel) {

    var files = fs.readdirSync("memes")
    var index = Math.floor(Math.random() * files.length)
    file = "./memes/" + files[index]

    var attachment = new Discord.MessageAttachment(file)
    channel.send(attachment)

}

/**
 * 
 * @param {Discord.Message} receivedMessage 
 */
function process8BallCommand(receivedMessage) {
    var answers = [
        "As I see it, yes.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don’t count on it.",
        "It is certain.",
        "It is decidedly so.",
        "Most likely.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Outlook good.",
        "Reply hazy, try again.",
        "Signs point to yes.",
        "Very doubtful.",
        "Without a doubt.",
        "Yes.",
        "Yes – definitely.",
        "You may rely on it."
    ]

    var channel = receivedMessage.channel
    var index = Math.floor(Math.random() * answers.length)

    channel.send(`${receivedMessage.author.username}, ${answers[index]}`)

}

client.login('Njk5NDE2MDc3NTc0MjA5NjE2.XpXaQg.VCACoB1zgS4Xe_lUx6j0FOxDya4');