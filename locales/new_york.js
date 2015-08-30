var newYorkHolidays = exports.holidays = {
    2015: {
        January: [ 1, 19 ],
        February: [ 16 ],
        April: [ 3 ],
        May: [ 25 ],
        July: [ 3 ],
        September: [ 7 ],
        November: [ 26 ],
        December: [ 25 ]
    },
    2016: {
        January: [ 1, 18 ],
        February: [ 15 ],
        March: [ 25 ],
        May: [ 30 ],
        July: [ 4 ],
        September: [ 5 ],
        November: [ 24 ],
        December: [ 26 ]
    }
};

var newYorkPartialTradingDays = exports.partialTradingDays = {
    2015: {
        November: [ 27 ],
        December: [ 24 ]
    },
    2016: {
        November: [ 25 ]
    }
};

var moment = require('moment-timezone');

function newYorkTime() {
    return moment().tz("America/New_York");
}

exports.time = newYorkTime;

function isNewYorkEquityMarketHoliday() {
    var time = newYorkTime(),
        holidays = newYorkHolidays[time.year()];
    
    if (holidays) holidays = holidays[time.format("MMMM")];
    
    if (holidays) return holidays.indexOf(time.date()) >= 0;
    else return false;
}

exports.isEquityMarketHoliday = isNewYorkEquityMarketHoliday;

function isNewYorkEquityMarketPartialTradingDay() {
    var time = newYorkTime(),
        holidays = newYorkPartialTradingDays[time.year()];
    
    if (holidays) holidays = holidays[time.format("MMMM")];
    
    if (holidays) return holidays.indexOf(time.date()) >= 0;
    else return false;
}

exports.isEquityMarketPartialTradingDay = isNewYorkEquityMarketPartialTradingDay;

function areNewYorkEquityMarketsOpen() {
    if (isNewYorkEquityMarketHoliday()) return false;
    else {
        var time = newYorkTime(),
            day = time.day(),
            hour = time.hour(),
            minute = time.minute();

        if (isNewYorkEquityMarketPartialTradingDay()) {
            // Monday to Friday, 9:30am to 1:00pm
            return ((hour == 9 && minute >= 30) || (hour > 9 && hour < 13));
        }
        else {
            // Monday to Friday, 9:30am to 4:00pm
            return (day > 0 && day < 6) && ((hour == 9 && minute >= 30) || (hour > 9 && hour < 16));
        }
    }
}

exports.areEquityMarketsOpen = areNewYorkEquityMarketsOpen;