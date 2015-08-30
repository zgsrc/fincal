var moment = require('moment-timezone');

function sydneyTime() {
    return moment().tz("Australia/Sydney");
}

exports.time = sydneyTime;
    
function areSydneyEquityMarketsOpen() {
    var time = sydneyTime(),
        day = time.day(),
        hour = time.hour(),
        minute = time.minute();
    
    // Monday to Friday, 10:00am to 4:00pm
    return (day > 0 && day < 6) && ((hour == 9 && minute >= 30) || (hour > 9 && hour < 16));
}

exports.areEquityMarketsOpen = areSydneyEquityMarketsOpen;