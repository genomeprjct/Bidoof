
const help = function(message) {
    var questsMsg = `
        quest <region> <quest-target> - returns a list of quests with Google maps locations that you can drive to.
                Valid regions: *philly*, *mercer*, *rsb*
                Valid quest targets: any pokemon name, or special quests:
                **dragon-candy** - Catch a Dragon for 3 Rare Candy
                **3 rare candy** - any quest that yields 3 rare candy
                **3 great throws 3 rare candy** - perform 3 great curveball throws in a row for 3 rare candy
                **dragon-dust** - Catch a Dragon for 1500 Dusto
                **throw-dust** - Various forms of the 3 great throws for 1000-1500 Dusto
                **silver-pinaps** - Spin 10 Pokestops for silver pinaps
                **chansey-candy** - Catch a Chansey for 3 rare candy
                **ditto-candy** - Catch a Ditto for 3 rare candy
                **fast tm** OR **move reroll fast** - Win 3 Raids for a Fast TM
                **charge tm** OR **move reroll special** - 7 Supereffective charve moves in gym battles for a Charge TM
                `;
    var qMsg = `
        q <region> <quest-target>
        Behaves just like **quest** but uses an abbreviated output
        `;
    var mapMsg = `
        where | whereis | map <partial gym name>
        Searches the map for a gym with the given name and returns it as a clickable link
        `;
    message.reply(`I am Bidoof, a Discord bot for searching quests and gyms.  Here are my commands:`);
    message.reply(questsMsg);
    message.reply(qMsg);
    message.reply(mapMsg);
}

module.exports = {
    help
}