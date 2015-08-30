var fincal = require("../"),
    chai = require("chai"),
    expect = chai.expect;

chai.should();

describe("Berlin", function() {
    
    it("should have a working time() method.", function() {
        fincal.berlin.time().should.be.an("object");
    });
    
    it("should have a working areEquityMarketsOpen() method.", function() {
        fincal.berlin.areEquityMarketsOpen().should.be.a("boolean");
    });
    
});