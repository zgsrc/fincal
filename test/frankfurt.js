var fincal = require("../"),
    chai = require("chai"),
    expect = chai.expect;

chai.should();

describe("Frankfurt", function() {
    
    it("should have a working currentTime() method.", function() {
        fincal.frankfurt.currentTime().should.be.an("object");
    });
    
    it("should have a working areMarketsOpenToday() method.", function() {
        fincal.frankfurt.areMarketsOpenToday().should.be.a("boolean");
    });
    
    it("should have a working areMarketsOpenNow() method.", function() {
        fincal.frankfurt.areMarketsOpenNow().should.be.a("boolean");
    });
    
});