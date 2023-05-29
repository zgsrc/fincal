exports.timezone = "Asia/Tokyo";

exports.regularTradingDays = "Weekday";

exports.regularTradingHours = [
    { from: "9:00 am", to: "11:30 am" },
    { from: "12:30 pm", to: "3:00 pm" }
];

exports.extendedTradingHours = [
    
];

exports.partialTradingDays = {
    
};

exports.partialTradingHours = [
    
];

exports.holidays = {
    2015: {
        January: [ 1, 2, 12 ],
        February: [ 11 ],
        April: [ 29 ],
        May: [ 4, 5, 6 ],
        July: [ 20 ],
        September: [ 21, 22, 23 ],
        October: [ 12 ],
        November: [ 3, 23 ],
        Decmeber: [ 23 ]
    },
    2016: {
        January: [ 1, 11 ],
        February: [ 11 ],
        March: [ 21 ],
        April: [ 29 ],
        May: [ 3, 4, 5 ],
        July: [ 18 ],
        Auguest: [ 11 ],
        September: [ 19, 22 ],
        October: [ 10 ],
        November: [ 3, 23 ],
        Decmeber: [ 23 ]
    },
    2017: {
        January: [ 2, 3, 9 ],
        March: [ 20 ],
        May: [ 3, 4, 5 ],
        July: [ 17 ],
        Auguest: [ 11 ],
        September: [ 18 ],
        October: [ 19 ],
        November: [ 3, 23 ]
    },
    2018: {
        January: [ 1, 2, 3, 8 ],
        February: [ 12 ],
        March: [ 21 ],
        April: [ 30 ],
        May: [ 4, 5 ],
        July: [ 16 ],
        September: [ 17, 24 ],
        October: [ 8 ],
        November: [ 23 ],
        December: [ 24, 31 ]
    },
    2019: {
        January: [ 1, 2, 3, 14 ],
        February: [ 11 ],
        March: [ 21 ],
        April: [ 29 ],
        May: [ 3, 6 ],
        July: [ 15 ],
        August: [ 12 ],
        September: [ 16, 23 ],
        October: [ 14 ],
        November: [ 4 ],
        December: [ 23, 31 ]
    },
    2020: {
        January: [ 1, 2, 3, 13 ],
        February: [ 11 ],
        March: [ 20 ],
        April: [ 29 ],
        May: [ 4, 5, 6 ],
        July: [ 20 ],
        August: [ 11 ],
        September: [ 21, 22 ],
        October: [ 12 ],
        November: [ 3, 23 ],
        December: [ 23, 31 ]
    }
};