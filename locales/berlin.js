var moment = require('moment-timezone');

function berlinTime() {
    return moment().tz("Europe/Berlin");
}

exports.time = berlinTime;

function areBerlinEquityMarketsOpen() {
    var time = berlinTime(),
        day = time.day(),
        hour = time.hour(),
        minute = time.minute();
    
    // Monday to Friday, 9:00am to 8:00pm
    return (day > 0 && day < 6) && (hour >= 9 && hour < 20);
}

exports.areEquityMarketsOpen = areBerlinEquityMarketsOpen;