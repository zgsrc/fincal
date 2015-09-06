var fincal = require("../"),
    calendar = fincal.calendar;

var chai = require("chai"),
    expect = chai.expect,
    fs = require("fs");

chai.should();

var files = fs.readdirSync("./locales").filter(/.*js/);

describe("Package", function() {
    files.forEach(function(file) {
        var title = file.replace(".js", "").titleize();
        it("should have a " + title + " locale", function() {
            var name = file.replace(/\.js/gi, "");
            expect(calendar(name)).to.be.ok;
        });
    });
});

files.forEach(function(file) {
    var title = file.replace(".js", "").titleize();
    describe(title, function() {
        var name = file.replace(/\.js/gi, "");
        
        
        ////////////////////////////////////////////////////////////
        // LOCALE
        ////////////////////////////////////////////////////////////
        it("should have a name '" + name.titleize() + "'.", function() {
            calendar(name).name.should.equal(name.titleize());
        });
        
        it("should have a locale object.", function() {
            calendar(name).locale.should.be.an("object");
        });
        
        it("should have a working currentTime() method.", function() {
            calendar(name).currentTime().should.be.an("object");
        });
        
        it("should have a working there() method.", function() {
            calendar(name).there({ year: 2015, month: 1, day: 12 }).should.be.an("object");
            
            calendar(name).there("next Monday").format("dddd").should.equal("Monday");
            
            var tuesday = Date.create("Tuesday");
            calendar(name).there(tuesday).toDate().toString().should.equal(tuesday.toString());
            calendar(name).there(tuesday.getTime()).valueOf().should.equal(tuesday.getTime());
            
            if (calendar(name).there(tuesday).format("Z") != tuesday.format("{tz}")) {
                calendar(name).there(tuesday).format().should.not.equal(tuesday.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}{isotz}"));
                calendar(name).there(tuesday.getTime()).format().should.not.equal(tuesday.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}{isotz}"));
                calendar(name).there("Tuesday").toDate().toString().should.not.equal(tuesday.toString());
            }
            else {
                calendar(name).there(tuesday).format().should.equal(tuesday.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}{isotz}"));
                calendar(name).there(tuesday.getTime()).format().should.equal(tuesday.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}{isotz}"));
                calendar(name).there("Tuesday").toDate().toString().should.equal(tuesday.toString());
            }
        });
        
        it("should have a working here() method.", function() {
            calendar(name).here({ year: 2015, month: 1, day: 12 }).should.be.an("object");
            
            calendar(name).here("next Monday").format("dddd").should.equal("Monday");
            
            var tuesday = Date.create("Tuesday");
            calendar(name).here(tuesday).toDate().toString().should.equal(tuesday.toString());
            calendar(name).here(tuesday.getTime()).valueOf().should.equal(tuesday.getTime());
            
            calendar(name).here(tuesday).format("Z").should.equal(tuesday.format("{isotz}"));
            calendar(name).here(tuesday).format().should.equal(tuesday.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}{isotz}"));
            calendar(name).here(tuesday.getTime()).format().should.equal(tuesday.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}{isotz}"));
            calendar(name).here("Tuesday").toDate().toString().should.equal(tuesday.toString());
        });
        
        
        ////////////////////////////////////////////////////////////
        // SIMPLE INTERFACE
        ////////////////////////////////////////////////////////////
        it("should have a working areMarketsOpenToday() method.", function() {
            calendar(name).areMarketsOpenToday().should.be.a("boolean");
        });
        
        it("should have a working areMarketsOpenToday() method.", function() {
            calendar(name).areMarketsOpenOn(Date.create("13 days ago")).should.be.a("boolean");
        });

        it("should have a working areMarketsOpenNow() method.", function() {
            calendar(name).areMarketsOpenNow().should.be.a("boolean");
        });
        
        it("should have a working areMarketsOpenNow() method.", function() {
            calendar(name).areMarketsOpenAt(Date.create("13 days ago")).should.be.a("boolean");
        });
        
        
        ////////////////////////////////////////////////////////////
        // TRADING DAY METHODS
        ////////////////////////////////////////////////////////////
        it("should have a working isTradingDay() method.", function() {
            calendar(name).isTradingDay().should.be.a("boolean");
            calendar(name).isTradingDay(Date.create("Jan 1 2017")).should.be.false;
            calendar(name).isTradingDay(Date.create("Jan 16 2015")).should.be.true;
        });
        
        it("should have a working isFullTradingDay() method.", function() {
            calendar(name).isFullTradingDay().should.be.a("boolean");
            calendar(name).isFullTradingDay(Date.create("Jan 1 2017")).should.be.false;
            calendar(name).isFullTradingDay(Date.create("Jan 16 2015")).should.be.true;
        });
        
        it("should have a working isRegularTradingDay() method.", function() {
            calendar(name).isRegularTradingDay().should.be.a("boolean");
            calendar(name).isRegularTradingDay(Date.create("Jan 1 2017")).should.be.false;
            calendar(name).isRegularTradingDay(Date.create("Jan 16 2015")).should.be.true;
        });
        
        it("should have a working isPartialTradingDay() method.", function() {
            calendar(name).isPartialTradingDay().should.be.a("boolean");
        });
        
        it("should have a working isHoliday() method.", function() {
            calendar(name).isHoliday().should.be.a("boolean");
            calendar(name).isHoliday(Date.create("Jan 1 2016")).should.be.true;
        });
        
        it("should have a working nextTradingDay() method.", function() {
            calendar(name).nextTradingDay().should.be.defined;
        });
        
        it("should have a working nextFullTradingDay() method.", function() {
            calendar(name).nextFullTradingDay().should.be.defined;
        });
        
        it("should have a working nextRegularTradingDay() method.", function() {
            calendar(name).nextRegularTradingDay().should.be.defined;
        });
        
        it("should have a working nextPartialTradingDay() method.", function() {
            calendar(name).nextPartialTradingDay().should.be.defined;
        });
        
        it("should have a working nextHoliday() method.", function() {
            calendar(name).nextHoliday().should.be.defined;
        });
        
        it("should have a working previousTradingDay() method.", function() {
            calendar(name).previousTradingDay().should.be.defined;
        });
        
        it("should have a working previousFullTradingDay() method.", function() {
            calendar(name).previousFullTradingDay().should.be.defined;
        });
        
        it("should have a working previousRegularTradingDay() method.", function() {
            calendar(name).previousRegularTradingDay().should.be.defined;
        });
        
        it("should have a working previousPartialTradingDay() method.", function() {
            calendar(name).previousPartialTradingDay().should.be.defined;
        });
        
        it("should have a working previousHoliday() method.", function() {
            calendar(name).previousHoliday().should.be.defined;
        });
        
        
        ////////////////////////////////////////////////////////////
        // TRADING HOURS METHODS
        ////////////////////////////////////////////////////////////
        it("should have a working isRegularTradingHours() method.", function() {
            calendar(name).isRegularTradingHours().should.be.a("boolean");
        });
        
        it("should have a working isExtendedTradingHours() method.", function() {
            calendar(name).isExtendedTradingHours().should.be.a("boolean");
        });
        
        it("should have a working isPartialTradingHours() method.", function() {
            calendar(name).isPartialTradingHours().should.be.a("boolean");
        });
        
        it("should have a working regularTradingHoursDuration() method.", function() {
            calendar(name).regularTradingHoursDuration().should.be.a("number");
        });
        
        it("should have a working extendedTradingHoursDuration() method.", function() {
            calendar(name).extendedTradingHoursDuration().should.be.a("number");
        });
        
        it("should have a working partialTradingHoursDuration() method.", function() {
            calendar(name).partialTradingHoursDuration().should.be.a("number");
        });
        
        
        ////////////////////////////////////////////////////////////
        // TRADING SESSION METHODS
        ////////////////////////////////////////////////////////////
        it("should have a working isTradingSession() method.", function() {
            calendar(name).isTradingSession().should.be.a("boolean");
        });
        
        it("should have a working isRegularTradingSession() method.", function() {
            calendar(name).isRegularTradingSession().should.be.a("boolean");
        });
        
        it("should have a working isExtendedTradingSession() method.", function() {
            calendar(name).isExtendedTradingSession().should.be.a("boolean");
        });
        
        it("should have a working isPartialTradingSession() method.", function() {
            calendar(name).isPartialTradingSession().should.be.a("boolean");
        });
        
        it("should have a working tradingSession() method.", function() {
            calendar(name).tradingSession.should.be.a("function");
        });
        
        it("should have a working tradingSessions() method.", function() {
            calendar(name).tradingSessions().should.be.an("array");
        });
        
        it("should have a working elapsedTradingSessions() method.", function() {
            calendar(name).elapsedTradingSessions().should.be.an("array");
        });
        
        it("should have a working commencedTradingSessions() method.", function() {
            //console.log(calendar(name).commencedTradingSessions());
            calendar(name).commencedTradingSessions().should.be.an("array");
        });
        
        it("should have a working remainingTradingSessions() method.", function() {
            calendar(name).remainingTradingSessions().should.be.an("array");
        });
        
        it("should have a working nextTradingSession() method.", function() {
            calendar(name).nextTradingSession().should.be.an("object");
        });
        
        it("should have a working previousTradingSession() method.", function() {
            calendar(name).previousTradingSession().should.be.an("object");
        });
        
        
        ////////////////////////////////////////////////////////////
        // TRADING DURATION METHODS
        ////////////////////////////////////////////////////////////
        it("should have a working tradingHoursDuration() method.", function() {
            calendar(name).tradingHoursDuration().should.be.a("number");
        });
        
        it("should have a working timeElapsedInRegularTradingHours() method.", function() {
            calendar(name).timeElapsedInRegularTradingHours().should.be.a("number");
        });
        
        it("should have a working timeElapsedInExtendedTradingHours() method.", function() {
            calendar(name).timeElapsedInExtendedTradingHours().should.be.a("number");
        });
        
        it("should have a working timeElapsedInPartialTradingHours() method.", function() {
            calendar(name).timeElapsedInPartialTradingHours().should.be.a("number");
        });
        
        it("should have a working timeElapsedInTradingDay() method.", function() {
            calendar(name).timeElapsedInTradingDay().should.be.a("number");
        });
        
        it("should have a working timeRemainingInTradingDay() method.", function() {
            calendar(name).timeRemainingInTradingDay().should.be.a("number");
        });
        
        it("should have a working tradingSessionDuration() method.", function() {
            calendar(name).tradingSessionDuration().should.be.a("number");
        });
        
        it("should have a working timeElapsedInTradingSession() method.", function() {
            calendar(name).timeElapsedInTradingSession().should.be.a("number");
        });
        
        it("should have a working timeRemainingInTradingSession() method.", function() {
            calendar(name).timeRemainingInTradingSession().should.be.a("number");
        });
        
        
    });
});