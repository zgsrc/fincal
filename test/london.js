var fincal = require("../"),
    chai = require("chai"),
    expect = chai.expect;

chai.should();

describe("London", function() {
    
    it("should have a working time() method.", function() {
        fincal.london.time().should.be.an("object");
    });
    
    it("should have a working areEquityMarketsOpen() method.", function() {
        fincal.london.areEquityMarketsOpen().should.be.a("boolean");
    });
    
});