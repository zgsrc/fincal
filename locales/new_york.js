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
    },
    2017: {
        July: [ 3 ],
        November: [ 24 ]
    },
    2018: {
        July: [ 3 ],
        November: [ 23 ],
        December: [ 24 ]
    },
    2019: {
        July: [ 3 ],
        November: [ 29 ],
        December: [ 24 ]
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
    },
    2017: {
        January: [ 2, 16 ],
        February: [ 20 ],
        April: [ 14 ],
        May: [ 29 ],
        July: [ 4 ],
        September: [ 4 ],
        November: [ 23 ],
        December: [ 25 ]
    },
    2018: {
        January: [ 1, 15 ],
        February: [ 19 ],
        March: [ 30 ],
        May: [ 28 ],
        July: [ 4 ],
        September: [ 3 ],
        November: [ 22 ],
        December: [ 25 ]
    },
    2019: {
        January: [ 1, 21 ],
        February: [ 18 ],
        April: [ 19 ],
        May: [ 27 ],
        July: [ 4 ],
        September: [ 2 ],
        November: [ 28 ],
        December: [ 25 ]
    },
    2020: {
        January: [ 1, 20 ],
        February: [ 17 ],
        April: [ 10 ],
        May: [ 25 ],
        July: [ 3 ],
        September: [ 7 ],
        November: [ 26 ],
        December: [ 25 ]
    }
};