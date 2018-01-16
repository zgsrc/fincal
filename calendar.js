require("sugar");

var moment = require("moment-timezone");

exports.here = function(date) {
    if (date) {
        if (moment.isMoment(date)) {
            return moment(date.toDate());
        }
        else if (Object.isString(date)) {
            return moment(Date.create(date).format('{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}'));
        }
        else if (Object.isNumber(date)) {
            return moment(date);
        }
        else if (Object.isObject(date)) {
            return moment(date);
        }
        else if (Object.isDate(date)) {
            return moment(date);
        }
        else {
            throw new Error("Unrecognized date " + date);
        }
    }
    else return moment();
};

exports.there = function(date, timezone) {
    if (date) {
        if (moment.isMoment(date)) {
            return date.clone().tz(timezone);
        }
        else if (Object.isString(date)) {
            return moment.tz(Date.create(date).format('{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}'), timezone);
        }
        else if (Object.isNumber(date)) {
            return moment.tz(Date.create(date), timezone);
        }
        else if (Object.isObject(date)) {
            return moment.tz(date, timezone);
        }
        else if (Object.isDate(date)) {
            return moment.tz(date, timezone);
        }
        else {
            throw new Error("Unrecognized date " + date);
        }
    }
    else return moment().tz(timezone);
};

exports.setTimezoneHere = function(tz) {
    moment.tz.setDefault(tz);
};

exports.Calendar = function(name, locale) {
    
    var me = this;
    
    
    ////////////////////////////////////////////////////////////
    // LOCALE
    ////////////////////////////////////////////////////////////
    this.name = name.titleize();
    
    this.locale = locale;
    
    this.currentTime = function() {
        return moment().tz(locale.timezone);
    };
    
    this.there = function(date) {
        if (date) {
            if (moment.isMoment(date)) {
                return date.clone().tz(locale.timezone);
            }
            else if (Object.isString(date)) {
                return moment.tz(Date.create(date).format('{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}'), locale.timezone);
            }
            else if (Object.isNumber(date)) {
                return moment.tz(Date.create(date), locale.timezone);
            }
            else if (Object.isObject(date)) {
                return moment.tz(date, locale.timezone);
            }
            else if (Object.isDate(date)) {
                return moment.tz(date, locale.timezone);
            }
            else {
                throw new Error("Unrecognized date " + date);
            }
        }
        else return me.currentTime();
    };
        
    this.here = exports.here;
    
    
    
    ////////////////////////////////////////////////////////////
    // SIMPLE INTERFACE
    ////////////////////////////////////////////////////////////
    this.areMarketsOpenToday = function() {
        return me.isTradingDay();
    };
    
    this.areMarketsOpenOn = function(date) {
        return me.isTradingDay(date);
    };
    
    this.areMarketsOpenNow = function(extended) {
        return me.isTradingSession(extended);
    };
    
    this.areMarketsOpenAt = function(datetime, extended) {
        return me.isTradingSession(datetime, extended);
    };
    
    
    
    ////////////////////////////////////////////////////////////
    // TRADING DAY METHODS
    ////////////////////////////////////////////////////////////
    this.isTradingDay = function(date) {
        return me.isRegularTradingDay(date) && !me.isHoliday(date);
    };
    
    this.isFullTradingDay = function(date) {
        return me.isTradingDay(date) && !me.isPartialTradingDay(date);
    };
    
    this.isRegularTradingDay = function(date) {
        if (locale.regularTradingDays) {
            if (Object.isString(locale.regularTradingDays)) {
                date = me.there(date);
                return Date.create(date.format("YYYY-MM-DD"))["is" + locale.regularTradingDays]();
            }
            else if (locale.regularTradingDays.from && locale.regularTradingDays.to) {
                var from = Date.create(locale.regularTradingDays.from).getDay(),
                    to = Date.create(locale.regularTradingDays.to).getDay(),
                    day = me.there(date).day();
                
                return day >= from && day <= to;
            }
            else return false;
        }
        else return false;
    };
    
    this.isPartialTradingDay = function(date) {
        if (locale.partialTradingDays) {
            var time = me.there(date),
                partialDays = locale.partialTradingDays[time.year()];

            if (partialDays) partialDays = partialDays[time.format("MMMM")];

            if (partialDays) return partialDays.indexOf(time.date()) >= 0;
            else return false;
        }
        else return false;
    };
    
    this.isHoliday = function(date) {
        if (locale.holidays) {
            var time = me.there(date),
                holidays = locale.holidays[time.year()];

            if (holidays) holidays = holidays[time.format("MMMM")];

            if (holidays) return holidays.indexOf(time.date()) >= 0;
            else return false;
        }
        else return false;
    };
    
    this.nextTradingDay = function(date) {
        date = me.there(date);
        date.hour(0);
        date.minute(0);
        date.second(0);
        date.millisecond(0);
        
        for (var i = 0; i < 10; i++) {
            if (me.isTradingDay(date)) return date;
            else date = date.add(1, "day");
        }
        
        throw new Error("Could not find next trading day.");
    };
    
    this.nextFullTradingDay = function(date) {
        date = me.there(date);
        date.hour(0);
        date.minute(0);
        date.second(0);
        date.millisecond(0);
        
        for (var i = 0; i < 10; i++) {
            if (me.isTradingDay(date) && !me.isPartialTradingDay(date)) return date;
            else date = date.add(1, "day");
        }
        
        throw new Error("Could not find next trading day.");
    };
    
    this.nextRegularTradingDay = function(date) {
        date = me.there(date);
        date.hour(0);
        date.minute(0);
        date.second(0);
        date.millisecond(0);
        
        for (var i = 0; i < 10; i++) {
            if (me.isRegularTradingDay(date)) return date;
            else date = date.add(1, "day");
        }
        
        throw new Error("Could not find next regular trading day.");
    };
    
    this.nextPartialTradingDay = function(date) {
        date = me.there(date);
        date.hour(0);
        date.minute(0);
        date.second(0);
        date.millisecond(0);
        
        for (var i = 0; i < 700; i++) {
            if (me.isPartialTradingDay(date)) return date;
            else date = date.add(1, "day");
        }
        
        return false;
    };
    
    this.nextHoliday = function(date) {
        date = me.there(date);
        date.hour(0);
        date.minute(0);
        date.second(0);
        date.millisecond(0);
        
        for (var i = 0; i < 400; i++) {
            if (me.isHoliday(date)) return date;
            else date = date.add(1, "day");
        }
        
        throw new Error("Could not find next holiday.");
    };
    
    this.previousTradingDay = function(date) {
        date = me.there(date);
        date.hour(0);
        date.minute(0);
        date.second(0);
        date.millisecond(0);
        
        for (var i = 0; i < 10; i++) {
            if (me.isTradingDay(date)) return date;
            else date = date.subtract(1, "day");
        }
        
        throw new Error("Could not find next trading day.");
    };
    
    this.previousFullTradingDay = function(date) {
        date = me.there(date);
        date.hour(0);
        date.minute(0);
        date.second(0);
        date.millisecond(0);
        
        for (var i = 0; i < 10; i++) {
            if (me.isTradingDay(date) && !me.isPartialTradingDay(date)) return date;
            else date = date.subtract(1, "day");
        }
        
        throw new Error("Could not find next trading day.");
    };
    
    this.previousRegularTradingDay = function(date) {
        date = me.there(date);
        date.hour(0);
        date.minute(0);
        date.second(0);
        date.millisecond(0);
        
        for (var i = 0; i < 10; i++) {
            if (me.isRegularTradingDay(date)) return date;
            else date = date.subtract(1, "day");
        }
        
        throw new Error("Could not find next regular trading day.");
    };
    
    this.previousPartialTradingDay = function(date) {
        date = me.there(date);
        date.hour(0);
        date.minute(0);
        date.second(0);
        date.millisecond(0);
        
        for (var i = 0; i < 700; i++) {
            if (me.isPartialTradingDay(date)) return date;
            else date = date.subtract(1, "day");
        }
        
        return false;
    };
    
    this.previousHoliday = function(date) {
        date = me.there(date);
        date.hour(0);
        date.minute(0);
        date.second(0);
        date.millisecond(0);
        
        for (var i = 0; i < 400; i++) {
            if (me.isHoliday(date)) return date;
            else date = date.subtract(1, "day");
        }
        
        throw new Error("Could not find next holiday.");
    };
    
    
    
    ////////////////////////////////////////////////////////////
    // TRADING HOURS METHODS
    ////////////////////////////////////////////////////////////
    this.isRegularTradingHours = function(date) {
        if (locale.regularTradingHours) {
            var time = me.there(date),
                hours = locale.regularTradingHours;
            
            return hours.any(function(session) {
                var from = Date.create(session.from),
                    to = Date.create(session.to);
                
                var inSession = 
                    (time.hours() == from.getHours() && time.minutes() >= from.getMinutes()) ||
                    (time.hours() > from.getHours() && time.hours() < to.getHours()) ||
                    (time.hours() == to.getHours() && time.minutes() < to.getMinutes());
                
                return inSession;
            });
        }
        else return false;
    };
    
    this.isExtendedTradingHours = function(date) {
        if (locale.extendedTradingHours) {
            var time = me.there(date),
                hours = locale.extendedTradingHours;
            
            return hours.any(function(session) {
                var from = Date.create(session.from),
                    to = Date.create(session.to);
                
                var inSession = 
                    (time.hours() == from.getHours() && time.minutes() >= from.getMinutes()) ||
                    (time.hours() > from.getHours() && time.hours() < to.getHours()) ||
                    (time.hours() == to.getHours() && time.minutes() < to.getMinutes());
                
                return inSession;
            });
        }
        else return false;
    };
    
    this.isPartialTradingHours = function(date) {
        if (locale.partialTradingHours) {
            var time = me.there(date),
                hours = locale.partialTradingHours;
            
            return hours.any(function(session) {
                var from = Date.create(session.from),
                    to = Date.create(session.to);
                
                var inSession = 
                    (time.hours() == from.getHours() && time.minutes() >= from.getMinutes()) ||
                    (time.hours() > from.getHours() && time.hours() < to.getHours()) ||
                    (time.hours() == to.getHours() && time.minutes() < to.getMinutes());
                
                return inSession;
            });
        }
        else return false;
    };
    
    this.regularTradingHoursDuration = function() {
        return locale.regularTradingHours.sum(function(session) {
            return Date.range(session.from, session.to).span();
        });
    };
    
    this.extendedTradingHoursDuration = function() {
        return locale.extendedTradingHours.sum(function(session) {
            return Date.range(session.from, session.to).span();
        });
    };
    
    this.partialTradingHoursDuration = function() {
        return locale.partialTradingHours.sum(function(session) {
            return Date.range(session.from, session.to).span();
        });
    };
    
    
    
    ////////////////////////////////////////////////////////////
    // TRADING SESSION METHODS
    ////////////////////////////////////////////////////////////
    this.isTradingSession = function(date, extended) {
        if (Object.isBoolean(date) && extended === undefined) {
            extended = date;
            date = me.currentTime();
        }
        
        if (me.isHoliday(date)) return false;
        else if (me.isPartialTradingDay(date)) return me.isPartialTradingHours(date);
        else if (me.isRegularTradingDay(date)) {
            if (extended) return me.isExtendedTradingHours(date);
            else return me.isRegularTradingHours(date);
        }
        else return false;
    };
    
    this.isRegularTradingSession = function(date) {
        if (Object.isBoolean(date) && extended === undefined) {
            extended = date;
            date = me.currentTime();
        }
        
        if (me.isHoliday(date)) return false;
        else if (me.isPartialTradingDay(date)) return false;
        else if (me.isRegularTradingDay(date)) return me.isRegularTradingHours(date);
        else return false;
    };
    
    this.isExtendedTradingSession = function(date) {
        if (Object.isBoolean(date) && extended === undefined) {
            extended = date;
            date = me.currentTime();
        }
        
        if (me.isHoliday(date)) return false;
        else if (me.isPartialTradingDay(date)) return false;
        else if (me.isRegularTradingDay(date)) return me.isExtendedTradingHours(date);
        else return false;
    };
    
    this.isPartialTradingSession = function(date) {
        if (Object.isBoolean(date) && extended === undefined) {
            extended = date;
            date = me.currentTime();
        }
        
        if (me.isPartialTradingDay(date)) return me.isPartialTradingHours(date);
        else return false;
    };
    
    this.tradingSession = function(date, extended) {
        if (Object.isBoolean(date) && extended === undefined) {
            extended = date;
            date = null;
        }
        
        var local = Date.create(me.there(date).format("hh:mm")),
            session = null;
        
        if (me.isHoliday(date)) {
            return null;
        }
        else if (me.isPartialTradingDay(date)) {
            session = locale.partialTradingHours.find(function(session) {
                return Date.create(session.from).isBefore(local) && Date.create(session.to).isAfter(local);
            });
        }
        else if (me.isRegularTradingDay(date)) {
            if (extended) {
                session = locale.extendedTradingHours.find(function(session) {
                    return Date.create(session.from).isBefore(local) && Date.create(session.to).isAfter(local);
                });
            }
            
            if (!session) {
                session = locale.regularTradingHours.find(function(session) {
                    return Date.create(session.from).isBefore(local) && Date.create(session.to).isAfter(local);
                });
            }
        }
        
        if (session) {
            var from = Date.create(session.from);
            session.start = moment(date);
            session.start.hour(from.getHours());
            session.start.minute(from.getMinutes());
            session.start.second(0);
            session.start.millisecond(0);
            
            var to = Date.create(session.to);
            session.end = moment(date);
            session.end.hour(to.getHours());
            session.end.minute(to.getMinutes());
            session.end.second(0);
            session.end.millisecond(0);
            
            return session;
        }
        else return null;
    };
    
    this.tradingSessions = function(date, extended) {
        if (Object.isBoolean(date) && extended === undefined) {
            extended = date;
            date = me.currentTime();
        }
        
        var sessions = [ ];
        if (me.isHoliday(date)) {
            sessions = [ ];
        }
        else if (me.isPartialTradingDay(date)) {
            sessions = locale.partialTradingHours.clone();
        }
        else if (me.isRegularTradingDay(date)) {
            if (extended) {
                sessions = locale.extendedTradingHours.union(locale.regularTradingHours).sortBy(function(session) {
                    return Date.create(session.to).getTime();
                });
            }
            else {
                sessions = locale.regularTradingHours.clone();
            }
        }
        
        return sessions.map(function(session) {
            var from = Date.create(session.from);
            session.start = moment(date);
            session.start.hour(from.getHours());
            session.start.minute(from.getMinutes());
            session.start.second(0);
            session.start.millisecond(0);
            
            var to = Date.create(session.to);
            session.end = moment(date);
            session.end.hour(to.getHours());
            session.end.minute(to.getMinutes());
            session.end.second(0);
            session.end.millisecond(0);
            
            return session;
        });
    };
    
    this.elapsedTradingSessions = function(date, extended) {
        var sessions = me.tradingSessions(date, extended),
            session = me.tradingSession(date, extended);
        
        if (session) {
            var index = sessions.findIndex(session);
            if (index > 0) return sessions.to(index);
            else return [ ];
        }
        else {
            var local = Date.create(me.there(date).format("hh:mm"));
            return sessions.findAll(function(session) {
                return Date.create(session.from).isBefore(local) && Date.create(session.to).isBefore(local);
            });
        }
    };
    
    this.commencedTradingSessions = function(date, extended) {
        var sessions = me.tradingSessions(date, extended),
            session = me.tradingSession(date, extended);
        
        if (session) {
            var index = sessions.findIndex(session);
            if (index >= 0) return sessions.to(index + 1);
            else return [ ];
        }
        else {
            var local = Date.create(me.there(date).format("hh:mm"));
            var index = sessions.findIndex(function(session) {
                return Date.create(session.from).isAfter(local);
            });
            
            if (index >= 0) return sessions.to(index);
            else return [ ];
        }
    };
    
    this.remainingTradingSessions = function(date, extended) {
        var sessions = me.tradingSessions(date, extended),
            session = me.tradingSession(date, extended);
        
        if (session) {
            return sessions.from(sessions.findIndex(session) + 1);
        }
        else {
            var local = Date.create(me.there(date).format("hh:mm"));
            return sessions.findAll(function(session) {
                return Date.create(session.from).isAfter(local) && Date.create(session.to).isAfter(local);
            });
        }
    };
    
    this.nextTradingSession = function(date, extended) {
        var sessions = me.remainingTradingSessions(date, extended);
        if (sessions.length) {
            return sessions.first();
        }
        else {
            date = me.nextTradingDay(date);
            sessions = me.tradingSessions(date, extended);
            return sessions.first();
        }
    };
    
    this.previousTradingSession = function(date, extended) {
        var sessions = me.elapsedTradingSessions(date, extended);
        if (sessions.length) {
            return sessions.last();
        }
        else {
            date = me.previousTradingDay(date);
            sessions = me.tradingSessions(date, extended);
            return sessions.last();
        }
    };
    
    
    
    ////////////////////////////////////////////////////////////
    // TRADING DURATION METHODS
    ////////////////////////////////////////////////////////////
    this.tradingHoursDuration = function(date, extended) {
        if (Object.isBoolean(date) && extended === undefined) {
            extended = date;
            date = me.currentTime();
        }
        
        if (me.isHoliday(date)) return 0;
        else if (me.isPartialTradingDay(date)) return me.partialTradingHoursDuration(date);
        else if (me.isRegularTradingDay(date)) {
            if (extended) return me.regularTradingHoursDuration(date) + me.extendedTradingHoursDuration(date);
            else return me.regularTradingHoursDuration(date);
        }
        else return 0;
    };
    
    this.timeElapsedInRegularTradingHours = function(date) {
        var local = Date.create(me.there(date).format("hh:mm"));
        return locale.regularTradingHours.sum(function(session) {
            if (Date.create(session.from).isAfter(local)) return 0;
            else if (Date.create(session.to).isBefore(local)) return Date.range(session.from, session.to).span();
            else return Date.range(session.from, local).span();
        });
    };
    
    this.timeElapsedInExtendedTradingHours = function(date) {
        var local = Date.create(me.there(date).format("hh:mm"));
        return locale.extendedTradingHours.sum(function(session) {
            if (Date.create(session.from).isAfter(local)) return 0;
            else if (Date.create(session.to).isBefore(local)) return Date.range(session.from, session.to).span();
            else return Date.range(session.from, local).span();
        });
    };
    
    this.timeElapsedInPartialTradingHours = function(date) {
        var local = Date.create(me.there(date).format("hh:mm"));
        return locale.partialTradingHours.sum(function(session) {
            if (Date.create(session.from).isAfter(local)) return 0;
            else if (Date.create(session.to).isBefore(local)) return Date.range(session.from, session.to).span();
            else return Date.range(session.from, local).span();
        });
    };
    
    this.timeElapsedInTradingDay = function(date, extended) {
        if (Object.isBoolean(date) && extended === undefined) {
            extended = date;
            date = null;
        }
        
        if (me.isHoliday(date)) {
            return 0;
        }
        else if (me.isPartialTradingDay(date)) {
            return me.timeElapsedInPartialTradingHours(date);
        }
        else if (me.isRegularTradingDay(date)) {
            return me.timeElapsedInRegularTradingHours(date) + (extended ? me.timeElapsedInExtendedTradingHours(date) : 0);
        }
        else return 0;
    };
    
    this.timeRemainingInTradingDay = function(date, extended) {
        return me.tradingHoursDuration(date, extended) - me.timeElapsedInTradingDay(date, extended);
    };
    
    this.tradingSessionDuration = function(date, extended) {
        var session = me.tradingSession(date, extended);
        if (session) return Date.range(session.from, session.to).span();
        else return 0;
    };
    
    this.timeElapsedInTradingSession = function(date, extended) {
        var session = me.tradingSession(date, extended),
            local = Date.create(me.there(date).format("hh:mm"));
        
        if (session) return Date.range(session.from, local).span();
        else return 0;
    };
    
    this.timeRemainingInTradingSession = function(date, extended) {
        return me.tradingSessionDuration(date, extended) - me.timeElapsedInTradingSession(date, extended);
    };
    


};