"use strict";

/**
 * Notify.js from Bucksy - https://github.com/0x736a64/Bucksy/blob/master/modules/controllers/notify.js
 *
 * @param msg the discord message
 */


const rareSpawnMessage = (msg) => {
    if(msg.embeds[0]) {
        let text = msg.embeds[0].description;
        let pokemonName = text.split(" ")[0].toLowerCase();
        let pokemonRole = msg.guild.roles.cache.find(role =>pokemonName.startsWith( role.name.toLowerCase() ))
        let locationName = msg.embeds[0].title;
        
        console.log(`${pokemonName} ${pokemonRole} ${locationName}`);

        if (pokemonRole) {
            msg.channel.send(`${pokemonRole} - ${locationName}`);
        }
    }
};

module.exports = {
    rareSpawnMessage
};