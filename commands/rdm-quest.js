var request = require('request');

const quest = function(message, command, args) {
    console.log(`${new Date()} quest ${args.join(' ')} ${message.author.username}`);
    var input = {};
    var api = 'http://www.pokemapthe.world:8000/stop.php?'

    input.target = args.join(' ');
    if (config.regions[args[0]]) {
        //first arg is the region
        server = args.shift();
        input.target = args.join(' ');
    }
    if (config.regions[server]) {
        customRegion = true;
        input.region = config.regions[server];
    }

    var options = {
        method: 'GET',
        headers: {}
    };

    var filter = null;
    var target = input.target;
    if (target === 'dragon-candy') {
        filter = 'quest=challenge_catch_dragon_veryhard&item=rare%20candy&itemCount=3';
    } else if (target === '3 rare candy') {
        filter = 'item=rare%20candy&itemCount=3';
    } else if (target === '3 great throws 3 rare candy') {
        filter = 'quest=challenge_land_great_curve_inarow_veryhard&item=rare%20candy&itemCount=3';
    } else if (target === 'ditto-candy') {
        filter = 'quest=challenge_catch_ditto_veryhard&item=rare%20candy&itemCount=3';
    } else if (target === '4 revives') {
        filter = 'item=revive&itemCount=4';
    } else if (target === '6 revives') {
        filter = 'item=revive&itemCount=6&quest=challenge_gym_win_hard';
    } else if (target === 'dragon-dust') {
        filter = 'quest=challenge_catch_dragon_veryhard&type=stardust';
    } else if (target === 'throw-dust') {
        filter = 'quest=challenge_land_great_inarow_hard,challenge_land_great_curve_hard,challenge_land_great_curve_inarow_veryhard&type=stardust&itemCount=1500';
    } else if (target === 'silver-pinaps') {
        filter = 'item=silver%20pinap&iteCount=5';
    } else if (target === 'charge-tm' || target === 'charge tm' || target === 'move reroll special') {
        filter = 'item=charge%20tm';
    } else if (target === 'fast-tm' || target === 'fast tm' || target === 'move reroll fast') {
        filter = 'item=fast%20tm';
    } else if (target === 'chansey-candy') {
        //filter = e => e.quest_template === 'challenge_val19_catch_specific_singular' && e.quest_rewards[0].info.item_id === 1301 && e.quest_rewards[0].info.amount === 3;
        message.reply('Not supported');
        return;
    } else if (target === 'eggs-candy-5') {
        filter = 'quest=t1_2019_quest_hatch_egg_plural&item=rare%20candy&itemCount=3';
    } else if (inverseTerms[target.toLowerCase()]) {
        filter = `encounter=${target.toLowerCase()}`;
    } else {
        message.reply(`invalid parameters ${target}`)
    }

    if (filter) {
        function callback(error, response, body) {
            if (!error && response.statusCode === 200) {
                var json = JSON.parse(response.body)
                json.forEach(q => {
                    if (command === "q") {
                        message.reply(`${q.name},${q.lat},${q.lon}`);
                    } else if (command === "qgpx") {
                        message.reply(`<wpt lat="${q.lat}" lon="${q.lon}"/>`);
                    } else {
                        message.reply(`**${q.name}**: ${gmapsUrlBase}${q.lat},${q.lon}`);
                    }

                })
                if (json.length === 0) {
                    message.reply('no matches');
                }
            }
        }

        options.url = api + filter;
        console.log(`requesting ${options.url}`);
        request(options, callback);
    } else {
        message.reply("Sorry, I don't know how to do that.");
    }
}

module.exports = {
    quest
}