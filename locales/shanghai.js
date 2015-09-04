exports.timezone = "Asia/Shanghai";

exports.regularTradingDays = "Weekday";

exports.regularTradingHours = [
    { from: "9:15 am", to: "11:30 am" },
    { from: "1:00 pm", to: "3:00 pm" }
];

exports.extendedTradingHours = [
    
];

exports.partialTradingDays = {
    
};

exports.partialTradingHours = [
    
];

exports.holidays = {
    2015: {
        January: [ 1, 2 ],
        February: [ 18, 19, 20, 23, 24 ],
        April: [ 6 ],
        May: [ 1 ],
        June: [ 22 ],
        September: [ 3, 4 ],
        October: [ 1, 2, 5, 6, 7 ]
    },
    2016: {
        January: [ 1 ],
        February: [ 8, 9, 10, 11, 12 ],
        April: [ 4 ],
        May: [ 2 ],
        June: [ 9, 10 ],
        September: [ 15, 16 ],
        October: [ 3, 4, 5, 6, 7 ]
    },
    2017: {
        January: [ 2, 30, 31 ],
        February: [ 1, 2, 3 ],
        April: [ 5 ],
        May: [ 1, 30 ],
        October: [ 2, 3, 4, 5, 6 ]
    },
    2018: {
        January: [ 1 ],
        February: [ 16, 19, 20, 21 ],
        April: [ 5 ],
        May: [ 1 ],
        June: [ 18 ],
        September: [ 24 ],
        October: [ 1, 2, 3, 4, 5 ]
    },
    2019: {
        January: [ 1 ],
        February: [ 5, 6, 7, 8 ],
        April: [ 5 ],
        May: [ 1 ],
        June: [ 7 ],
        September: [ 13 ],
        October: [ 1, 2, 3, 4 ]
    },
    2020: {
        January: [ 1, 27, 28, 29, 30 ],
        May: [ 1, 25 ],
        October: [ 1, 2, 5 ]
    }  
};