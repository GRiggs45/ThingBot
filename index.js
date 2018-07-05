const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const Enmap = require("enmap");
const Provider = require("enmap-level");

client.points = new Enmap({provider: new Provider({name: "points", persistent: true})});
client.settings = new Enmap({provider: new Provider({name: "settings", persistent: true})});

const defaultSettings = {
    prefix: ",",
    welcomeMessage: "Say Hello to {{user}}!"
};

client.on("ready", ()=>{
    console.log("ThingBot is now online!")
});

client.on("guildCreate", guild => {
    client.settings.set(guild.id, defaultSettings);
});

client.on("message", (message)=>{
    var a = 0;
    let modedPrefix = client.settings.get("prefix");
    const args = message.content.trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const key = `${message.guild.id}-${message.author.id}`
    const thisConf = client.settings.get(message.guild.id);

    if (message.author.bot) return;

    if (message.content.indexOf(client.settings.get("prefix")) !== 0) return;

    switch (command) {
        case ",test" :
            message.channel.send("Albert deserves to die!");

            break;
        case "setprefix" :
            let newPrefix = args[0]
            config.prefix = newPrefix;

            client.settings.set(message.guild.id, newPrefix);
            message.channel.send("The prefix has been changed to " + newPrefix);
            break;
        case "resetsettings" :
            client.settings.set(message.guild.id, defaultSettings);
            break;
    }
})

client.on("guildMemberAdd", member =>{
    //send message to joinmsgchannel var
    message.config.joinmsgchannel.send(`Welcome to the server, ${member}`);
})


client.login(config.token)