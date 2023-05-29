exports.timezone = "Europe/Berlin";

exports.regularTradingDays = "Weekday";

exports.regularTradingHours = [
    { from: "9:00 am", to: "5:30 pm" }
];

exports.extendedTradingHours = [
    { from: "8:00 am", to: "9:00 am" },
    { from: "5:30 pm", to: "8:00 pm" }
];

exports.partialTradingDays = {
    
};

exports.partialTradingHours = [
    
];

exports.holidays = {
    2015: {
        January: [ 1 ],
        April: [ 3, 6 ],
        May: [ 1, 25 ],
        December: [ 24, 25, 31 ]
    },
    2016: {
        January: [ 1 ],
        March: [ 25, 28 ],
        December: [ 26 ]
    },
    2017: {
        April: [ 14, 17 ],
        May: [ 1 ],
        December: [ 25, 26 ]
    },
    2018: {
        January: [ 1 ],
        March: [ 30 ],
        April: [ 2 ],
        May: [ 1 ],
        December: [ 24, 25, 26, 31 ]
    },
    2019: {
        January: [ 1 ],
        April: [ 19, 22 ],
        May: [ 1 ],
        December: [ 24, 25, 26, 31 ]
    },
    2020: {
        January: [ 1 ],
        April: [ 10, 13 ],
        May: [ 1 ],
        December: [ 24, 25, 31 ]
    }
};