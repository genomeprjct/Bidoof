const Discord = require("discord.js");
const utils = require("./utils");

const isValidPoke = function(pokemon) {
    return pokemon && utils.inverseTerms[pokemon.toLowerCase()]
}

const addPokemon = function(msg, args) {
    let pokemonName = args[0].toLowerCase();
    let pokemon = msg.guild.roles.cache.find(role => role.name.toLowerCase() === pokemonName);
    let user = msg.member;
    let pokemonMsg;

    if (pokemonName === "") return;

    if (pokemon) {
        if (msg.member.roles.cache.some(role => role.name.toLowerCase() === pokemonName)) {
            pokemonMsg = new Discord.MessageEmbed()
                .setColor(0x7FDF37)
                .setTitle(`${msg.member.user.tag} You already have the **${pokemon.name}** role.`);

            msg.channel.send(pokemonMsg);
        } else {
            user.roles.add(pokemon.id).catch(console.error);
            pokemonMsg = new Discord.MessageEmbed()
                .setColor(0x7FDF37)
                .setTitle(`${msg.member.user.tag} You now have the **${pokemon.name}** role.`);

            msg.channel.send(pokemonMsg);
        }
    } else if (isValidPoke(pokemonName)) {
        // Create a new role with data
        console.log(`creating role ${pokemonName}`);
        msg.guild.roles.create({
            name: pokemonName,
            color: 'BLUE',
            mentionable: true,
        })
            .then(role => {
                user.roles.add(role.id).catch(console.error);

                pokemonMsg = new Discord.MessageEmbed()
                    .setColor(0x7FDF37)
                    .setTitle(`${msg.member.user.tag} You now have the **${role.name}** role.`);

                msg.channel.send(pokemonMsg);
            })
            .catch(console.error);
    } else {
        pokemonMsg = new Discord.MessageEmbed()
                .setColor(0xEF2D19)
                .setTitle(`${msg.member.user.tag} Illegal role! This action has been reported.`);

                msg.channel.send(pokemonMsg);
    }

};

const removePokemon = function(msg, args) {
    let pokemonName = args[0].toLowerCase();

    if (pokemonName === "") return;

    let pokemon = msg.guild.roles.cache.find(role => role.name.toLowerCase() === pokemonName);
    let user = msg.member;
    let pokemonMsg;

    if (pokemon && isValidPoke(pokemonName)) {
        if (msg.member.roles.cache.some(pokemon => pokemonName === pokemon.name.toLowerCase())) {
            user.roles.remove(pokemon.id).catch(console.error);
            pokemonMsg = new Discord.MessageEmbed()
                .setColor(0x7FDF37)
                .setTitle(`${msg.member.user.tag} You no longer have the **${pokemon.name}** role.`);
        } else {
            pokemonMsg = new Discord.MessageEmbed()
                .setColor(0xEF2D19)
                .setTitle(`${msg.member.user.tag} You do not have the **${pokemon.name}** role assigned.`);
        }
    } else {
        pokemonMsg = new Discord.MessageEmbed()
            .setColor(0xEF2D19)
            .setTitle(`${msg.member.user.tag} That role is not self-assignable.`);
    }

    msg.channel.send(pokemonMsg);
};

module.exports = {
    addPokemon, removePokemon
}
