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
        it("should have a working currentTime() method.", function() {
            calendar(name).currentTime().should.be.an("object");
        });
        
        it("should have a working isRegularTradingDay() method.", function() {
            calendar(name).isRegularTradingDay().should.be.a("boolean");
        });
        
        it("should have a working isPartialTradingDay() method.", function() {
            calendar(name).isPartialTradingDay().should.be.a("boolean");
        });
        
        it("should have a working isHoliday() method.", function() {
            calendar(name).isHoliday().should.be.a("boolean");
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
    });
});