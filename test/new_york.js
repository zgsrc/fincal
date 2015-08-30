var fincal = require("../"),
    chai = require("chai"),
    expect = chai.expect;

chai.should();

describe("New York", function() {
    
    it("should have a working time() method.", function() {
        fincal.new_york.time().should.be.an("object");
    });
    
    it("should have a working areEquityMarketsOpen() method.", function() {
        fincal.new_york.areEquityMarketsOpen().should.be.a("boolean");
    });
    
    it("should have a working isEquityMarketHoliday() method.", function() {
        fincal.new_york.isEquityMarketHoliday().should.be.a("boolean");
    });
    
    it("should have a working isEquityMarketPartialTradingDay() method.", function() {
        fincal.new_york.isEquityMarketPartialTradingDay().should.be.a("boolean");
    });
    
});