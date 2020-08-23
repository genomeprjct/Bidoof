"use strict";

/**
 * Notify.js from Bucksy - https://github.com/0x736a64/Bucksy/blob/master/modules/controllers/notify.js
 *
 * @param msg the discord message
 */


const rareSpawnMessage = (msg) => {
    if(msg.embeds[0]) {
        let pokemonName = msg.embeds[0].fields[0].name.split("**")[1].toLowerCase();
        let pokemonRole = msg.guild.roles.find(role => role.name.toLowerCase() === pokemonName);
        let locationName = msg.embeds[0].fields[1].name.split("|")[0];

        console.log(`${pokemonName} ${pokemonRole} ${locationName}`);

        if (pokemonRole) {
            msg.channel.send(`${pokemonRole} - ${locationName}`);
        }
    }
};

module.exports = {
    rareSpawnMessage
};