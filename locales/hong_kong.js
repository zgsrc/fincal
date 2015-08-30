var moment = require('moment-timezone');

function hongKongTime() {
    return moment().tz("Asia/Hong_Kong");
}

exports.time = hongKongTime;

function areHongKongEquityMarketsOpen() {
    var time = newYorkTime(),
        day = time.day(),
        hour = time.hour(),
        minute = time.minute();
    
    // Monday to Friday, 9:30am to 4:00pm
    return (day > 0 && day < 6) && ((hour == 9 && minute >= 30) || (hour > 9 && hour < 16));
}

exports.areEquityMarketsOpen = areHongKongEquityMarketsOpen;