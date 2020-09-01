const gt = q => q.rewards_string == '3 Rare Candies' && q.conditions_string=='Make 3 Great Curveball Throws in a row'
const ditto = q => q.rewards_string == '3 Rare Candies' && q.conditions_string=='Catch 1 Pokémon (Ditto)'
const dragon = q => q.rewards_string == '3 Rare Candies' && q.conditions_string=='Catch 1 Pokémon (Type: Dragon)'
const dragonDust = q => q.conditions_string=='Catch 1 Pokémon (Type: Dragon)'
const d4d = q => q.rewards_string == 'Pokémon Encounter: Dratini' && q.conditions_string=='Catch 1 Pokémon (Type: Dragon)'
const truth = q => true;
const axios = require('axios')
const sorter = require('./utils').sorter;

const mad = function(message, args) {
    console.log(`${new Date()} sgmap ${args.join(' ')} ${message.author.username}`)
    var param = args.join(' ')

    var filter = gt
    var nycurl = 'https://sgpokemap.com/quests.php?quests%5B%5D=7%2C0%2C113&quests%5B%5D=7%2C0%2C147&quests%5B%5D=7%2C0%2C246&quests%5B%5D=7%2C0%2C290&quests%5B%5D=2%2C0%2C1301'

    if (param == 'ditto') {
        filter = ditto
    } else if (param == 'dragon') {
        filter = dragon
    } else if (param == 'd4d') {
        filter = d4d
    } else if (param == 'dragon-dust') {
        nycurl = 'https://sgpokemap.com/quests.php?quests%5B%5D=7%2C0%2C290&quests%5B%5D=3%2C1500%2C0&quests%5B%5D=3%2C1000%2C0'
        filter = dragonDust
    } else if (param == 'venusaur-energy') {
        nycurl = 'https://sgpokemap.com/quests.php?quests%5B%5D=7%2C0%2C290&quests%5B%5D=12%2C0%2C3&time=1598931609000'
        filter = truth;
    } else if (param == 'blastoise-energy') {
        nycurl = 'https://sgpokemap.com/quests.php?quests%5B%5D=7%2C0%2C290&quests%5B%5D=12%2C0%2C9&time=1598931665855'
        filter = truth;
    } else if (param == 'charizard-energy') {
        nycurl = 'https://sgpokemap.com/quests.php?quests%5B%5D=7%2C0%2C290&quests%5B%5D=12%2C0%2C6&time=1598931698392'
        filter = truth;
    }

    axios.get(nycurl)
        .then(res => {
            var matches = res.data.quests.filter(filter).sort(sorter)
            matches.forEach(q => {
                message.reply(`**${q.name}**: ${q.lat},${q.lng}`);
            })
        })
}

module.exports = {
    mad
}