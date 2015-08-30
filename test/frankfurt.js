var fincal = require("../"),
    chai = require("chai"),
    expect = chai.expect;

chai.should();

describe("Frankfurt", function() {
    
    it("should have a working time() method.", function() {
        fincal.frankfurt.time().should.be.an("object");
    });
    
    it("should have a working areEquityMarketsOpen() method.", function() {
        fincal.frankfurt.areEquityMarketsOpen().should.be.a("boolean");
    });
    
});