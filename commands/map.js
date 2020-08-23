const axios = require('axios')

function findGymCoords(enteredLoc, callback) {
    const headers = {
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8",
        'Cookie': "_ga=GA1.2.1445176112.1569459778; session=eyJsb2dnZWRfaW4iOnRydWUsInVzZXJfaWQiOiIzMzg3MzQyNTkwMjYwMDE5MjAiLCJ1c2VybmFtZSI6Imdlbm9tZXByamN0Izk5MjciLCJwZXJtcyI6eyJtYXAiOnRydWUsInBva2Vtb24iOnRydWUsInJhaWRzIjp0cnVlLCJneW1zIjp0cnVlLCJwb2tlc3RvcHMiOnRydWUsInF1ZXN0cyI6dHJ1ZSwibHVyZXMiOnRydWUsImludmFzaW9ucyI6dHJ1ZSwic3Bhd25wb2ludHMiOnRydWUsIml2Ijp0cnVlLCJwdnAiOnRydWUsInMyY2VsbHMiOnRydWUsInN1Ym1pc3Npb25DZWxscyI6dHJ1ZSwibmVzdHMiOnRydWUsIndlYXRoZXIiOnRydWUsImRldmljZXMiOnRydWV9LCJndWlsZHMiOlsiMjAxMzA0OTY0NDk1MDQ4NzA0IiwiMjIxMzA2MTcyMTYwODY4MzUyIiwiMjQzNTY1NzMzMjc4MTIxOTg0IiwiMjQ1MjgzMjcyODA2ODkxNTMwIiwiMjUyNzc2MjUxNzA4ODAxMDI0IiwiMjcxMzkyMTM0MTY5NDkzNTA1IiwiMzAxMjQ3ODY0ODMzNTcyODY0IiwiMzA2MzczMTcwMjU5MTY1MTg0IiwiMzI5NTQxMTYwOTc0NjgwMDc0IiwiMzMwMzcxMjU5MzM2NjIyMDgwIiwiMzM5NjI0ODI0Nzk0MTIwMTk0IiwiMzQxNzczMTk3OTc0MzA2ODI2IiwiMzQyNzg0OTA0MDkxNjY0Mzk1IiwiMzQ1MTc0MDA3NjM4OTE3MTIyIiwiMzYyOTYyODU2Mzg1MzE0ODQ4IiwiMzc1MDg0NDQwODIyNzQzMDUxIiwiMzc1NjcxOTYwNDc2MTg4NjgyIiwiMzkwMjEwODQ4OTQyOTgxMTIzIiwiNDI3MTIzNzY0NjU2OTk2MzUzIiwiNDQ0OTYyNjUzNDc2MjI1MDI1IiwiNDUzNDUwMjgwODk4NjU4MzA0IiwiNDY1ODE2MDc5NTU0NDQ1MzMyIiwiNDc2ODU3Njk1NzMxODQzMDg0IiwiNTE0ODU0NzY4OTMwNDU1NTUzIiwiNTM0NDIzODkxOTE3OTMwNTQ4IiwiNTY0MTcxOTAyMjY5MjU5Nzc2IiwiNjEyNTk4NTk4NzY4NjU2Mzg0IiwiNjQxODg1ODE1ODc3Nzk1ODUxIiwiNjQ1MDExMTc2MTgyMjUxNTIyIiwiNjc2MjM4MjkxODA4Mjg4Nzc4IiwiNjg5MDc5MDgwODkyNzYwMTI1IiwiNzAxOTIzMjM1MTg4NDQxMjM5IiwiNzA1MzE4MjgwMzY1MjExNzI4IiwiNzA1MzE4Mzg3NzAxNzc2NDI2IiwiNzA1MzE4NDk4NDMxMTM5ODYwIiwiNzA1MzE4NjI0MTgwNTY4MTU0IiwiNzA1MzE5MjIyMTkxOTgwNTU0IiwiNzA1MzE5MzgxNjM0MzgzOTIyIiwiNzA1MzE5NTQwMTExNzA0MTY1IiwiNzA1MzE5ODkyMDc2NzI0MjI5IiwiNzA1MzE5OTg1NTEzMjM0NDc0IiwiNzA1MzIwMTk1OTYyNDM3NjkzIiwiNzA1MzIwMzA3NDEzNjE0NjgzIiwiNzA1MzIwNDcwNDEyNzg3NzE0IiwiNzA1MzIwNjc4MjQ4Njc3NDQ2IiwiNzA1MzIwODQwNzgyNDEzODU0IiwiNzA1MzIwOTU2NDQ0Mjc4ODE0IiwiNzA1MzIxMTQ2NDQ2NTEyMjA5IiwiNzA1MzIxMjYwMDI0MDcwMTY1IiwiNzA1MzIxMzc0MDM3ODM1Nzg3IiwiNzA1MzIxNDYzNzc0OTY5OTE5IiwiNzA1MzIxNTcwNDczNjA3MjEwIiwiNzA1MzIzODc1Mjk0MjQ5MDAxIiwiNzA1MzI0MjEzODI0OTEzNDA5IiwiNzMzNjA3NDU4Njg5Mzg0NTExIl0sInZhbGlkIjp0cnVlfQ==; session.sig=HhVtaPOgX0-lIUs-G6qk-XcS_Po; _gid=GA1.2.1093017609.1597859923; _csrf=ei25oGNaykvxZr6vs0zNg_-7; x-csrf-token=ilTOpaK6-UOpCrEdKIbxmrAUxZ-G3nUgxQ8Y; TOKEN=ilTOpaK6-UOpCrEdKIbxmrAUxZ-G3nUgxQ8Y; _gat=1"
    }
    const body = `id=search-gym&value=${enteredLoc}`
    const url = "https://pokemapthe.world/api/search";
    axios({
        method: 'post',
        url: url,
        data: body,
        headers: headers
    }).then(function(res){
        callback(res.data.data);
    }).catch(function (error) {
        console.log(error);
        callback(null);
    })
}

const gmapsUrlBase = 'https://www.google.com/maps/place/';

const doMap = function(message, command, args, client) {
    const mentions = message.content.match(/(<(@|#)\d+>)/g);

    var mentionsStr = '';
    if (mentions != null) {
        mentionsStr = mentions.join(' ');
    }

    const enteredLoc = args.join(' ').replace(/\*/g, '').trim(); // remove any asterisks
    console.log(`${new Date()} ${command} for ${enteredLoc} on behalf of ${message.author.username}`)
    findGymCoords(enteredLoc, results => {
        if (results != null && results.length > 5) {
            message.reply(`Too many results for **${enteredLoc}**. Please enter a more exact name.`);
            console.log(`${new Date()} Too many results: ${enteredLoc} ${message.author.username}`);
        }
        else if (results != null && results.length > 0) {
            for (row of results) {
                const exRaidEmoji = client.emojis.get("408703057950408724")
                const exRaid = row.exraid_eligible === 1 ? exRaidEmoji : ''
                message.reply(`**${row.name}**: ${gmapsUrlBase}${row.lat},${row.lon} ${mentionsStr} ${exRaid}`);
            }
        } else {
            message.reply(`Sorry, I couldn't find a gym named **${enteredLoc}**. Please check that you entered the name correctly.`);
            console.log(`${new Date()} Could not find gym named: ${enteredLoc} ${message.author.username}`);
        }
    });
}

module.exports = {
    doMap
}