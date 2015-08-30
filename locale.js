require("sugar");

var moment = require("moment-timezone");

module.exports = function(locale) {
    
    var me = this;
    
    this.name = locale;
    
    locale = require("./locales/" + locale);
    
    this.currentTime = function() {
        return moment().tz(locale.timezone);
    };
    
    this.isRegularTradingDay = function() {
        if (locale.regularTradingDays) {
            if (Object.isString(locale.regularTradingDays)) {
                return Date.create()["is" + locale.regularTradingDays]();
            }
            else if (locale.regularTradingDays.from && locale.regularTradingDays.to) {
                var from = Date.create(locale.regularTradingDays.from).getDay(),
                    to = Date.create(locale.regularTradingDays.to).getDay(),
                    day = moment().day();
                
                return day >= from && day <= to;
            }
            else return false;
        }
        else return false;
    };
    
    this.isPartialTradingDay = function() {
        if (locale.partialTradingDays) {
            var time = me.currentTime(),
                holidays = locale.partialTradingDays[time.year()];

            if (holidays) holidays = holidays[time.format("MMMM")];

            if (holidays) return holidays.indexOf(time.date()) >= 0;
            else return false;
        }
        else return false;
    };
    
    this.isHoliday = function() {
        if (locale.holidays) {
            var time = me.currentTime(),
                holidays = locale.holidays[time.year()];

            if (holidays) holidays = holidays[time.format("MMMM")];

            if (holidays) return holidays.indexOf(time.date()) >= 0;
            else return false;
        }
        else return false;
    };
    
    this.isRegularTradingHours = function() {
        if (locale.regularTradingHours) {
            var time = me.currentTime(),
                hours = locale.regularTradingHours;
            
            return hours.any(function(session) {
                var from = Date.create(session.from),
                    to = Date.create(session.to);
                
                var inSession = 
                    (time.hours() == from.getHours() && time.minutes() >= from.getMinutes()) ||
                    (time.hours() > from.getHours() && time.hours() < to.getHours()) ||
                    (time.hours() == to.getHours() && time.minutes < to.getMinutes());
                
                return inSession;
            });
        }
        else return false;
    };
    
    this.isExtendedTradingHours = function() {
        if (locale.extendedTradingHours) {
            var time = me.currentTime(),
                hours = locale.extendedTradingHours;
            
            return hours.any(function(session) {
                var from = Date.create(session.from),
                    to = Date.create(session.to);
                
                var inSession = 
                    (time.hours() == from.getHours() && time.minutes() >= from.getMinutes()) ||
                    (time.hours() > from.getHours() && time.hours() < to.getHours()) ||
                    (time.hours() == to.getHours() && time.minutes < to.getMinutes());
                
                return inSession;
            });
        }
        else return false;
    };
    
    this.isPartialTradingHours = function() {
        if (locale.partialTradingHours) {
            var time = me.currentTime(),
                hours = locale.partialTradingHours;
            
            return hours.any(function(session) {
                var from = Date.create(session.from),
                    to = Date.create(session.to);
                
                var inSession = 
                    (time.hours() == from.getHours() && time.minutes() >= from.getMinutes()) ||
                    (time.hours() > from.getHours() && time.hours() < to.getHours()) ||
                    (time.hours() == to.getHours() && time.minutes < to.getMinutes());
                
                return inSession;
            });
        }
        else return false;
    };
    
    this.areMarketsOpenToday = function() {
        if (me.isHoliday()) return false;
        else if (me.isPartialTradingDay()) return true;
        else return me.isRegularTradingDay();
    };
    
    this.areMarketsOpenNow = function(extended) {
        if (me.isHoliday()) {
            return false;
        }
        else if (me.isPartialTradingDay()) {
            return me.isPartialTradingHours();
        }
        else if (me.isRegularTradingDay()) {
            if (extended) return me.isExtendedTradingHours();
            else return me.isRegularTradingHours();
        }
        else return false;
    };
    
    this.totalTradingTimeToday = function(extended) {
        if (me.isHoliday()) {
            return 0;
        }
        else if (me.isPartialTradingDay()) {
            return locale.partialTradingHours.sum(function(session) {
                return Date.range(session.from, session.to).span();
            });
        }
        else if (me.isRegularTradingDay()) {
            if (extended) {
                return locale.extendedTradingHours.sum(function(session) {
                    return Date.range(session.from, session.to).span();
                });
            }
            else {
                return locale.regularTradingHours.sum(function(session) {
                    return Date.range(session.from, session.to).span();
                });
            }
        }
        else return 0;
    };
    
    this.timeElapsedInTradingDay = function(extended) {
        var now = me.currentTime(),
            local = Date.create(now.format("hh:mm"));
        
        if (me.isHoliday()) {
            return 0;
        }
        else if (me.isPartialTradingDay()) {
            return locale.partialTradingHours.sum(function(session) {
                if (session.from.isAfter(local)) return 0;
                else if (session.to.isBefore(local)) return Date.range(session.from, session.to).span();
                else return Date.range(session.from, local).span();
            });
        }
        else if (me.isRegularTradingDay()) {
            if (extended) {
                return locale.extendedTradingHours.sum(function(session) {
                    if (session.from.isAfter(local)) return 0;
                    else if (session.to.isBefore(local)) return Date.range(session.from, session.to).span();
                    else return Date.range(session.from, local).span();
                });
            }
            else {
                return locale.regularTradingHours.sum(function(session) {
                    if (session.from.isAfter(local)) return 0;
                    else if (session.to.isBefore(local)) return Date.range(session.from, session.to).span();
                    else return Date.range(session.from, local).span();
                });
            }
        }
        else return 0;
    };
    
    this.timeRemainingInTradingDay = function(extended) {
        return me.totalTradingTimeToday(extended) - me.timeElapsedInTradingDay(extended);
    };
    
    this.totalTimeInCurrentSession = function(extended) {
        var now = me.currentTime(),
            local = Date.create(now.format("hh:mm"));
        
        if (me.isHoliday()) {
            return 0;
        }
        else if (me.isPartialTradingDay()) {
            var session = locale.partialTradingHours.find(function(session) {
                if (session.from.isAfter(local)) return false;
                else if (session.to.isBefore(local)) return false;
                else return true;
            });
            
            if (session) return Date.range(session.from, session.to).span();
            else return 0;
        }
        else if (me.isRegularTradingDay()) {
            if (extended) {
                var session = locale.extendedTradingHours.find(function(session) {
                    if (session.from.isAfter(local)) return false;
                    else if (session.to.isBefore(local)) return false;
                    else return true;
                });

                if (session) return Date.range(session.from, session.to).span();
                else return 0;
            }
            else {
                var session = locale.regularTradingHours.find(function(session) {
                    if (session.from.isAfter(local)) return false;
                    else if (session.to.isBefore(local)) return false;
                    else return true;
                });

                if (session) return Date.range(session.from, session.to).span();
                else return 0;
            }
        }
        else return 0;
    };
    
    this.timeElapsedInCurrentSession = function(extended) {
        var now = me.currentTime(),
            local = Date.create(now.format("hh:mm"));
        
        if (me.isHoliday()) {
            return 0;
        }
        else if (me.isPartialTradingDay()) {
            var session = locale.partialTradingHours.find(function(session) {
                if (session.from.isAfter(local)) return false;
                else if (session.to.isBefore(local)) return false;
                else return true;
            });
            
            if (session) return Date.range(session.from, local).span();
            else return 0;
        }
        else if (me.isRegularTradingDay()) {
            if (extended) {
                var session = locale.extendedTradingHours.find(function(session) {
                    if (session.from.isAfter(local)) return false;
                    else if (session.to.isBefore(local)) return false;
                    else return true;
                });

                if (session) return Date.range(session.from, local).span();
                else return 0;
            }
            else {
                var session = locale.regularTradingHours.find(function(session) {
                    if (session.from.isAfter(local)) return false;
                    else if (session.to.isBefore(local)) return false;
                    else return true;
                });

                if (session) return Date.range(session.from, local).span();
                else return 0;
            }
        }
        else return 0;
    };
    
    this.timeRemainingInCurrentSession = function(extended) {
        return me.totalTimeInCurrentSession() - me.timeElapsedInCurrentSession();
    };
};