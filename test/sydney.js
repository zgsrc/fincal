var fincal = require("../"),
    chai = require("chai"),
    expect = chai.expect;

chai.should();

describe("Sydney", function() {
    
    it("should have a working time() method.", function() {
        fincal.sydney.time().should.be.an("object");
    });
    
    it("should have a working areEquityMarketsOpen() method.", function() {
        fincal.sydney.areEquityMarketsOpen().should.be.a("boolean");
    });
    
});