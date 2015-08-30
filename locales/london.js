var moment = require('moment-timezone');

function londonTime() {
    return moment().tz("Europe/London");
}

exports.time = londonTime;

function areLondonEquityMarketsOpen() {
    var time = newYorkTime(),
        day = time.day(),
        hour = time.hour(),
        minute = time.minute();
    
    // Monday to Friday, 8:00am to 4:30pm
    return (day > 0 && day < 6) && ((hour > 8 && hour < 16) || (hour == 16 && minute <= 30));
}

exports.areEquityMarketsOpen = areLondonEquityMarketsOpen;