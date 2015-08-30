var fincal = require("../"),
    chai = require("chai"),
    expect = chai.expect;

chai.should();

describe("Paris", function() {
    
    it("should have a working time() method.", function() {
        fincal.paris.time().should.be.an("object");
    });
    
    it("should have a working areEquityMarketsOpen() method.", function() {
        fincal.paris.areEquityMarketsOpen().should.be.a("boolean");
    });
    
});