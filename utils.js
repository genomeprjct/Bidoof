const terms = require('./terms');

const swap = function(json){

    var ret = {};
    for(var key in json){
        ret[json[key].toLowerCase()] = key;
    }
    return ret;
}

const inverseTerms = swap(terms.terms)

const sorter = function(o1, o2) {
    const latCompare = numCompare(o1.lat,o2.lat)
    const lngCompare = numCompare(o1.lng,o2.lng)
    if (latCompare == lngCompare) {
        return latCompare;
    } else if(latCompare == 0) {
        return lngCompare;
    } else if(lngCompare == 0) {
        return latCompare;
    } else if (latCompare > lngCompare) {
        return latCompare;
    } else {
        return lngCompare;
    }
}

const numCompare = function(d1, d2) {
    if (d1 < d2) {
        return -1;
    } else if (d1 > d2) {
        return 1;
    } else {
        return 0;
    }
}


module.exports = {
    numCompare, sorter, inverseTerms, swap
}
