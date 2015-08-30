var moment = require('moment-timezone');

function tokyoTime() {
    return moment().tz("Asia/Tokyo");
}

exports.time = tokyoTime;

function areTokyoEquityMarketsOpen() {
    var time = newYorkTime(),
        day = time.day(),
        hour = time.hour(),
        minute = time.minute();
    
    // Monday to Friday, 9:00am to 11:30am and 12:30pm to 3:00pm
    return (day > 0 && day < 6) && (
        ((hour >= 9 && hour < 11) || (hour == 11 && minute <= 30)) || 
        ((hour == 12 && minute >= 30) || (hour > 12 && hour < 15))
    );
}

exports.areEquityMarketsOpen = areTokyoEquityMarketsOpen;