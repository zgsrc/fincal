var fincal = require("../"),
    chai = require("chai"),
    expect = chai.expect,
    fs = require("fs");

chai.should();

var files = fs.readdirSync("./locales").filter(/.*js/);

describe("Package", function() {
    files.forEach(function(file) {
        var title = file.replace(".js", "").titleize();
        it("should have a " + title + " locale", function() {
            var name = file.replace(/\.js/gi, "");
            expect(fincal[name]).to.be.ok;
        });
    });
});

files.forEach(function(file) {
    var title = file.replace(".js", "").titleize();
    describe(title, function() {
        var name = file.replace(/\.js/gi, "");
        it("should have a working currentTime() method.", function() {
            fincal[name].currentTime().should.be.an("object");
        });
        
        it("should have a working isRegularTradingDay() method.", function() {
            fincal[name].isRegularTradingDay().should.be.a("boolean");
        });
        
        it("should have a working isPartialTradingDay() method.", function() {
            fincal[name].isPartialTradingDay().should.be.a("boolean");
        });
        
        it("should have a working isHoliday() method.", function() {
            fincal[name].isHoliday().should.be.a("boolean");
        });
        
        it("should have a working isRegularTradingHours() method.", function() {
            fincal[name].isRegularTradingHours().should.be.a("boolean");
        });
        
        it("should have a working isExtendedTradingHours() method.", function() {
            fincal[name].isExtendedTradingHours().should.be.a("boolean");
        });
        
        it("should have a working isPartialTradingHours() method.", function() {
            fincal[name].isPartialTradingHours().should.be.a("boolean");
        });
        
        it("should have a working areMarketsOpenToday() method.", function() {
            fincal[name].areMarketsOpenToday().should.be.a("boolean");
        });

        it("should have a working areMarketsOpenNow() method.", function() {
            fincal[name].areMarketsOpenNow().should.be.a("boolean");
        });
        
        it("should have a working totalTradingTimeToday() method.", function() {
            fincal[name].totalTradingTimeToday().should.be.an("number");
        });
        
        it("should have a working timeElapsedInTradingDay() method.", function() {
            fincal[name].timeElapsedInTradingDay().should.be.an("number");
        });
        
        it("should have a working timeRemainingInTradingDay() method.", function() {
            fincal[name].timeRemainingInTradingDay().should.be.an("number");
        });
        
        it("should have a working totalTimeInCurrentSession() method.", function() {
            fincal[name].totalTimeInCurrentSession().should.be.an("number");
        });
        
        it("should have a working timeElapsedInCurrentSession() method.", function() {
            fincal[name].timeElapsedInCurrentSession().should.be.an("number");
        });
        
        it("should have a working timeRemainingInCurrentSession() method.", function() {
            fincal[name].timeRemainingInCurrentSession().should.be.an("number");
        });
    });
});