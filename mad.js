const gt = q => q.rewards_string == '3 Rare Candies' && q.conditions_string=='Make 3 Great Curveball Throws in a row'
const ditto = q => q.rewards_string == '3 Rare Candies' && q.conditions_string=='Catch 1 Pokémon (Ditto)'
const dragon = q => q.rewards_string == '3 Rare Candies' && q.conditions_string=='Catch 1 Pokémon (Type: Dragon)'
const dragonDust = q => q.conditions_string=='Catch 1 Pokémon (Type: Dragon)'
const d4d = q => q.rewards_string == 'Pokémon Encounter: Dratini' && q.conditions_string=='Catch 1 Pokémon (Type: Dragon)'
const axios = require('axios')
const sorter = require('utils').sorter;

const mad = function(message, args) {
    console.log(`${new Date()} nycmap ${args.join(' ')} ${message.author.username}`)
    var param = args.join(' ')

    var filter = gt
    var nycurl = 'https://nycpokemap.com/quests.php?quests%5B%5D=7%2C0%2C113&quests%5B%5D=7%2C0%2C147&quests%5B%5D=7%2C0%2C246&quests%5B%5D=7%2C0%2C290&quests%5B%5D=2%2C0%2C1301'

    if (param == 'ditto') {
        filter = ditto
    } else if (param == 'dragon') {
        filter = dragon
    } else if (param == 'd4d') {
        filter = d4d
    } else if (param == 'dragon-dust') {
        nycurl = 'https://nycpokemap.com/quests.php?quests%5B%5D=7%2C0%2C290&quests%5B%5D=3%2C1500%2C0&quests%5B%5D=3%2C1000%2C0'
        filter = dragonDust
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