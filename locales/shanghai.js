var moment = require('moment-timezone');

function shanghaiTime() {
    return moment().tz("Asia/Shanghai");
}

exports.time = shanghaiTime;

function areShanghaiEquityMarketsOpen() {
    var time = newYorkTime(),
        day = time.day(),
        hour = time.hour(),
        minute = time.minute();
    
    // Monday to Friday, 9:15am to 11:30am and 1:00pm to 3:00pm
    return (day > 0 && day < 6) && (
        ((hour == 9 && minute >= 15) || (hour > 9 && hour < 11) || (hour == 11 && minute <= 30)) || 
        (hour >= 1 && hour < 15)
    );
}

exports.areEquityMarketsOpen = areShanghaiEquityMarketsOpen;