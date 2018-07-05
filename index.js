const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
const Provider = require("enmap-level");

client.config = config;
client.points = new Enmap({provider: new Provider({name: "points", persistent: true})});
client.settings = new Enmap({provider: new Provider({name: "settings", persistent: true})});
client.commands = new Enmap();

const defaultSettings = {
    prefix: ",",
    welcomeMessage: "Say Hello to {{user}}!"
};

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        //ignore anything we dont want
        if (!file.endsWith(".js")) return;
        //load event file
        const event = require(`./events/${file}`);
        //get event name
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        //load command file
        let props = require(`./commands/${file}`);
        let comamndName = file.split(".")[0];
        console.log(`Attempting to load command ${comamndName}`);
        //store it in enmap
        client.commands.set(comamndName, props);
    });
});

client.login(config.token)