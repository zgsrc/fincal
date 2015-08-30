var moment = require('moment-timezone');

function frankfurtTime() {
    return moment().tz("Europe/Berlin");
}

exports.time = frankfurtTime;

function areEquityMarketsOpen() {
    var time = frankfurtTime(),
        day = time.day(),
        hour = time.hour(),
        minute = time.minute();
    
    // Monday to Friday, 9:00am to 8:00pm
    return (day > 0 && day < 6) && ((hour >= 9 && hour < 5) || (hour == 5 && minutes <= 30));
}

exports.areEquityMarketsOpen = areEquityMarketsOpen;