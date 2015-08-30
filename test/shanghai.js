var fincal = require("../"),
    chai = require("chai"),
    expect = chai.expect;

chai.should();

describe("Shanghai", function() {
    
    it("should have a working time() method.", function() {
        fincal.shanghai.time().should.be.an("object");
    });
    
    it("should have a working areEquityMarketsOpen() method.", function() {
        fincal.shanghai.areEquityMarketsOpen().should.be.a("boolean");
    });
    
});