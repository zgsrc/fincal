exports.timezone = "America/New_York";

exports.regularTradingDays = "Weekday";

exports.regularTradingHours = [
    { from: "9:30 am", to: "4:00 pm" }
];

exports.extendedTradingHours = [
    { from: "4:00 am", to: "9:30 am" },
    { from: "4:00 pm", to: "8:00 pm" }
];

exports.partialTradingDays = {
    2015: {
        November: [ 27 ],
        December: [ 24 ]
    },
    2016: {
        November: [ 25 ]
    }
};

exports.partialTradingHours = [
    { from: "9:30 am", to: "1:00 pm" }
];

exports.holidays = {
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