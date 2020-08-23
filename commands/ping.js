const ping = async function(message, args) {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    var server = '';
    if (message.guild) {
        var currGuild = client.guilds.get(message.guild.id);
        if (currGuild) {
            server = currGuild.name.toLowerCase();
        }
    }
    console.log(server);
    const m = await message.channel.send("Testing ping...");
    m.edit(`Pongo! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
}

module.exports = {
    ping
}