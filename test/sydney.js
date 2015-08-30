var fincal = require("../"),
    chai = require("chai"),
    expect = chai.expect;

chai.should();

describe("Sydney", function() {
    
    it("should have a working currentTime() method.", function() {
        fincal.sydney.currentTime().should.be.an("object");
    });
    
    it("should have a working areMarketsOpenNow() method.", function() {
        fincal.sydney.areMarketsOpenNow().should.be.a("boolean");
    });
    
});