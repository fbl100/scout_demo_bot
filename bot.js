const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    console.log("Servers:")
    client.guilds.cache.forEach( (guild) => {
        console.log(" - " + guild.name)

        guild.channels.cache.forEach( (channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })

    client.channels.fetch("691368035759685682")
        .then(channel => channel.send("Hello World"))
        .catch(console.error)
    // client.guilds.((guild) => {
    //     console.log(" - " + guild.name)
    // })
})

client.on('message', (receivedMessage) => {

    // prevent the bot from responsing to its own requests
    if(receivedMessage.author == client.user)
    {
        return
    }

    if(receivedMessage.content.startsWith("!scout-meme"))
    {
        processsMemeCommand(receivedMessage)
    }
    else if(receivedMessage.content.startsWith("!scout-8ball"))
    {
        process8BallCommand(receivedMessage);
    }
    else {
        moderateMessage(receivedMessage);
    }

})

client.on('messageReactionAdd', (messageReaction, user) => {

    var guild = messageReaction.message.guild
    guild.roles.cache.forEach(x => console.log(x))

    if(messageReaction.emoji.toString() == '👍') {
        
        guild.members.fetch(user.id)
            .then( member => {
                member.roles.add("699118028566298664")
            })
            .catch( e => console.log(e))
    }

    console.log(`${user.username} reacted to ${messageReaction.message.content} with ${messageReaction.emoji}` )
})



/**
 * 
 * @param {Discord.Message} receivedMessage 
 */
function moderateMessage(receivedMessage)
{
    var curseWords = new Set(['darn', 'shoot', 'shucks'])
    for(let word of curseWords) {
        if(receivedMessage.content.includes(word)) {
            receivedMessage.delete()
            postRandomMeme(receivedMessage.channel)
            break
        }

    }

}

/**
 * 
 * @param {Discord.Message} receivedMessage 
 */
function process8BallCommand(receivedMessage)
{
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


  //get the channel that the message was sent in
    var channel = receivedMessage.channel
    var index = Math.floor(Math.random() * answers.length)

    var question = receivedMessage.content.replace("!scout-8ball", "")

    console.log(`${receivedMessage.author.username} asked: ${question}, reply = ${answers[index]}`)

    channel.send(`${receivedMessage.author.username}, ${answers[index]}`)

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
function processCommand(receivedMessage) {
    console.log(`Received Command ${receivedMessage.content}`)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token = "Njk5Mzg2MDgwMDcxMzg1MTg3.XpTvfA.xQGBxh-gzRae7XZXHkufpYWrNIU"

client.login(bot_secret_token)