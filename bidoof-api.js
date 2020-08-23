// Load up the discord.js library
const Discord = require("discord.js");

const axios = require('axios');

const utils = require("./utils");
const rareSpawns = require("./commands/rare-spawns");
const mad = require("./mad");
const help = require("./commands/help")
const ping = require("./commands/ping")
const rdmQuests = require("./commands/rdm-quest")
const mapper = require("./commands/map")

// Create the main client object with methods to interface with Discord
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./bidoof.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.
// config.gmapsApiKey contains the bot's Google Maps Static API key



client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`${new Date()} Bot ${client.user.id} has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`on ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`${new Date()} New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`on ${client.guilds.size} servers`);
});

client.on("error", error => {
    console.log(`Received an error ${error}`);
});

client.on("guildDelete", guild => {
    // This event triggers when the bot is removed from a guild.
    console.log(`${new Date()} I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`on ${client.guilds.size} servers`);
});

client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.

    // skip self messages
    if (message.author === client.user) return;

    if (config.rareSpawnChannels.includes(message.channel.id) && message.embeds[0]) {
        console.log('rare spawn hit.')
        rareSpawns.rareSpawnMessage(message);
    }

    // skip other bot messages unless its from a rare spawn channel
    if (message.author.bot) {
        return;
    }

    // if (message.author.username == 'DarthButcher') return;

    // Remove any mentions but save the mentions TODO
    const content = message.content.replace(/<(@|#)\d+>/g, '').trim();

    // Ignore any message that does not start with our prefix,
    if (content.indexOf(config.prefix) !== 0) return;

    // Separate our "command" name, and our "arguments" for the command.
    const args = content.split(/\s+/g);
    const command = args.shift().slice(config.prefix.length).toLowerCase();

    if (command === "ping") {
        ping.ping(message, args);
    }

    if (command === "help") {
        help.help(message, args)
    }

    if (command === "say") {
        // makes the bot say something and delete the message. As an example, it's open to anyone to use.
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => {
        });
        message.channel.send(sayMessage);
    }

    if (command === "nycmap") {
        mad.mad(message, args);
    }

    if (command === "quest" || command === "q" || command === "qgpx") {
        rdmQuests.quest(message, command, args);
    }

    if (command === "findgrimersnyc") {

        var mon = args.join(' ')
        console.log(`${new Date()} searching for ${mon} for ${message.author.username}`)
        var since = Date.now() / 1000 - 60
        var axiosConfig = {
            headers: {
                'accept': 'application/json',
                'accept-encoding': 'gzip',
                'referer': 'https://nycpokemap.com/index.html'
            }
        }

        var url = `https://nycpokemap.com/query2.php?since=${since}&mons=${mon}`
        axios.get(url, axiosConfig)
            .then(res => {
                var buffer = '```'
                var counter = 0;
                if (res.data.pokemons.length > 0) {
                    res.data.pokemons.forEach(q => {
                        counter++;
                        buffer += `${q.lat},${q.lng}\n`
                        if (counter % 30 == 0) {
                            buffer += '```'
                            message.reply(buffer);
                            buffer = '```';
                        }

                    })
                    buffer += '```'
                    message.reply(buffer);
                }
                else {
                    message.reply("No matches!!!!!!");
                }
            })
    }

    if (command === "findgrimerssg") {

        var mon = args.join(' ')
        console.log(`${new Date()} searching for ${mon} for ${message.author.username}`)
        var since = Date.now() / 1000 - 60
        var axiosConfig = {
            headers: {
                'accept': 'application/json',
                'accept-encoding': 'gzip',
                'referer': 'https://sgpokemap.com/index.html'
            }
        }

        var url = `https://sgpokemap.com/query2.php?since=${since}&mons=${mon}`
        axios.get(url, axiosConfig)
            .then(res => {
                var buffer = '```'
                var counter = 0;
                if (res.data.pokemons.length > 0) {
                    res.data.pokemons.forEach(q => {
                        counter++;
                        buffer += `${q.lat},${q.lng}\n`
                        if (counter % 30 == 0) {
                            buffer += '```'
                            message.reply(buffer);
                            buffer = '```';
                        }

                    })
                    buffer += '```'
                    message.reply(buffer);
                }
                else {
                    message.reply("No matches!!!!!!");
                }
            })
    }

    // get a Google Maps url based on the gym name. not case sensitive. periods and asterisks are removed.
    // e.g. +whereis washington's crossing
    if (command === "where" || command === "whereis" || command === "map") {
        mapper.doMap(message, command, args, client);
    }

});


process.on('uncaughtException', function (err) {
    console.log("uncaughtException");
    console.error(err.stack);
    process.exit();
});

process.on('SIGINT', () => {
    process.exit(0);
});

client.login(config.token);
