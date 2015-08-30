var moment = require('moment-timezone');

function parisTime() {
    return moment().tz("Europe/Paris");
}

exports.time = parisTime;

function areParisEquityMarketsOpen() {
    var time = parisTime(),
        day = time.day(),
        hour = time.hour(),
        minute = time.minute();
    
    // Monday to Friday, 9:00am to 5:30pm
    return (day > 0 && day < 6) && ((hour >= 9 && hour < 17) || (hour == 17 && minute < 30));
}

exports.areEquityMarketsOpen = areParisEquityMarketsOpen;