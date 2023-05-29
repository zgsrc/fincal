exports.timezone = "Europe/Copenhagen";

exports.regularTradingDays = "Weekday";

exports.regularTradingHours = [
    { from: "9:00 am", to: "5:00 pm" }
];

exports.extendedTradingHours = [

];

exports.partialTradingDays = {

};

exports.partialTradingHours = [

];

exports.holidays = {
    2016: {
        January: [ 1 ],
        March: [ 24, 25, 28 ],
        April: [ 22 ],
        May: [ 5, 6, 16 ],
        December: [ 26 ]
    },
    2017: {
        April: [ 13, 14, 17 ],
        May: [ 12, 25, 26 ],
        June: [ 5 ],
        December: [ 25, 26 ]
    },
    2018: {
        January: [ 1 ],
        March: [ 29, 30 ],
        April: [ 2, 27 ],
        May: [ 10, 21 ],
        June: [ 5 ],
        December: [ 24, 25, 26, 31 ]
    },
    2019: {
        January: [ 1 ],
        April: [ 18, 19, 22 ],
        May: [ 17, 30, 31 ],
        June: [ 5, 10 ],
        December: [ 24, 25, 26, 31 ]
    },
    2020: {
        January: [ 1 ],
        April: [ 9, 10, 13 ],
        May: [ 8, 21, 22 ],
        June: [ 1, 5 ],
        December: [ 24, 25, 26, 31 ]
    },
};
