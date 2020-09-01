const Discord = require("discord.js");

const addPokemon = function(msg, args) {
    let pokemonName = args[0].toLowerCase();
    let pokemon = msg.guild.roles.find(role => role.name.toLowerCase() === pokemonName);
    let user = msg.member;
    let pokemonMsg;

    if (pokemonName === "") return;

    if (pokemon) {
        if (msg.member.roles.some(role => role.name.toLowerCase() === pokemonName)) {
            pokemonMsg = new Discord.RichEmbed()
                .setColor(0x7FDF37)
                .setTitle(`${msg.member.user.tag} You already have the **${pokemon.name}** role.`);

            msg.channel.send(pokemonMsg);
        } else {
            user.addRole(pokemon).catch(console.error);
            pokemonMsg = new Discord.RichEmbed()
                .setColor(0x7FDF37)
                .setTitle(`${msg.member.user.tag} You now have the **${pokemon.name}** role.`);

            msg.channel.send(pokemonMsg);
        }
    } else {
        // Create a new role with data
        msg.guild.createRole({
            name: pokemonName,
            color: 'BLUE',
            mentionable: true,
        })
            .then(role => {
                user.addRole(role).catch(console.error);

                pokemonMsg = new Discord.RichEmbed()
                    .setColor(0x7FDF37)
                    .setTitle(`${msg.member.user.tag} You now have the **${role.name}** role.`);

                msg.channel.send(pokemonMsg);
            })
            .catch(console.error);
    }

};

const removePokemon = function(msg, args) {
    let pokemonName = args[0].toLowerCase();

    if (pokemonName === "") return;

    let pokemon = msg.guild.roles.find(role => role.name.toLowerCase() === pokemonName);
    let user = msg.member;
    let pokemonMsg;

    if (pokemon) {
        if (msg.member.roles.some(pokemon => pokemonName === pokemon.name.toLowerCase())) {
            user.removeRole(pokemon).catch(console.error);
            pokemonMsg = new Discord.RichEmbed()
                .setColor(0x7FDF37)
                .setTitle(`${msg.member.user.tag} You no longer have the **${pokemon.name}** role.`);
        } else {
            pokemonMsg = new Discord.RichEmbed()
                .setColor(0xEF2D19)
                .setTitle(`${msg.member.user.tag} You do not have the **${pokemon.name}** role assigned.`);
        }
    } else {
        pokemonMsg = new Discord.RichEmbed()
            .setColor(0xEF2D19)
            .setTitle(`${msg.member.user.tag} That role is not self-assignable.`);
    }

    msg.channel.send(pokemonMsg);
};

module.exports = {
    addPokemon, removePokemon
}