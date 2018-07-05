module.exports = (client, message) => {
    //ignore all boty bois
    if (message.author.bot) return;

    if (message.content.indexOf(client.settings.prefix) !== 0) return;

    const args = message.content.slice(client.settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if (!cmd) return;

    cmd.run(client, message, args);
}