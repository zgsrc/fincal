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
        
        it("should have a name '" + name.titleize() + "'.", function() {
            calendar(name).name.should.equal(name.titleize());
        });
        
        it("should have a locale object.", function() {
            calendar(name).locale.should.be.an("object");
        });
        
        it("should have a working localize() method.", function() {
            calendar(name).localize({ year: 2015, month: 1, day: 12 }).should.be.an("object");
            
            calendar(name).localize("next Monday").format("dddd").should.equal("Monday");
            
            var tuesday = Date.create("Tuesday");
            calendar(name).localize(tuesday).toDate().toString().should.equal(tuesday.toString());
            calendar(name).localize(tuesday.getTime()).valueOf().should.equal(tuesday.getTime());
            
            if (calendar(name).localize(tuesday).format("Z") != tuesday.format("{tz}")) {
                calendar(name).localize(tuesday).format().should.not.equal(tuesday.format(Date.ISO8601_DATETIME));
                calendar(name).localize(tuesday.getTime()).format().should.not.equal(tuesday.format(Date.ISO8601_DATETIME));
                calendar(name).localize("Tuesday").toDate().toString().should.not.equal(tuesday.toString());
            }
            else {
                calendar(name).localize(tuesday).format().should.equal(tuesday.format(Date.ISO8601_DATETIME));
                calendar(name).localize(tuesday.getTime()).format().should.equal(tuesday.format(Date.ISO8601_DATETIME));
                calendar(name).localize("Tuesday").toDate().toString().should.equal(tuesday.toString());
            }
        });
        
        it("should have a working currentTime() method.", function() {
            calendar(name).currentTime().should.be.an("object");
        });
        
        
        
        /*
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
            calendar(name).isRegularTradingDay(Date.create("Jan 1 2016")).should.be.true;
        });
        
        it("should have a working isRegularTradingHours() method.", function() {
            calendar(name).isRegularTradingHours().should.be.a("boolean");
        });
        
        it("should have a working isExtendedTradingHours() method.", function() {
            calendar(name).isExtendedTradingHours().should.be.a("boolean");
        });
        
        it("should have a working isPartialTradingHours() method.", function() {
            calendar(name).isPartialTradingHours().should.be.a("boolean");
        });
        
        it("should have a working areMarketsOpenToday() method.", function() {
            calendar(name).areMarketsOpenOn(Date.create("13 days ago")).should.be.a("boolean");
        });

        it("should have a working areMarketsOpenNow() method.", function() {
            calendar(name).areMarketsOpenAt(Date.create("13 days ago")).should.be.a("boolean");
        });
        
        it("should have a working totalTradingTimeToday() method.", function() {
            calendar(name).totalTradingTimeOn(Date.create("13 days ago")).should.be.an("number");
        });
        
        it("should have a working areMarketsOpenToday() method.", function() {
            calendar(name).areMarketsOpenToday().should.be.a("boolean");
        });

        it("should have a working areMarketsOpenNow() method.", function() {
            calendar(name).areMarketsOpenNow().should.be.a("boolean");
        });
        
        it("should have a working totalTradingTimeToday() method.", function() {
            calendar(name).totalTradingTimeToday().should.be.an("number");
        });
        
        it("should have a working timeElapsedInTradingDay() method.", function() {
            calendar(name).timeElapsedInTradingDay().should.be.an("number");
        });
        
        it("should have a working timeRemainingInTradingDay() method.", function() {
            calendar(name).timeRemainingInTradingDay().should.be.an("number");
        });
        
        it("should have a working totalTimeInCurrentSession() method.", function() {
            calendar(name).totalTimeInCurrentSession().should.be.an("number");
        });
        
        it("should have a working timeElapsedInCurrentSession() method.", function() {
            calendar(name).timeElapsedInCurrentSession().should.be.an("number");
        });
        
        it("should have a working timeRemainingInCurrentSession() method.", function() {
            calendar(name).timeRemainingInCurrentSession().should.be.an("number");
        });
        
        it("should have a working nextTradingDay() method.", function() {
            calendar(name).nextTradingDay().should.be.an("object");
        });
        
        it("should have a working nextRegularTradingDay() method.", function() {
            calendar(name).nextRegularTradingDay().should.be.an("object");
        });
        
        it("should have a working nextPartialTradingDay() method.", function() {
            calendar(name).nextPartialTradingDay().should.be.defined;
        });
        
        it("should have a working nextHoliday() method.", function() {
            calendar(name).nextHoliday().should.be.an("object");
        });

        it("should have a working nextTradingSession() method.", function() {
            calendar(name).nextTradingSession().should.be.an("object");
        });
        
        it("should have a working nextRegularTradingSession() method.", function() {
            calendar(name).nextRegularTradingSession().should.be.an("object");
        });
        
        it("should have a working nextExtendedTradingSession() method.", function() {
            calendar(name).nextExtendedTradingSession().should.be.an("object");
        });
        
        it("should have a working nextPartialTradingSession() method.", function() {
            calendar(name).nextPartialTradingSession().should.be.defined;
        });
        */
        
    });
});