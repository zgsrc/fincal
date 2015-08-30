var fincal = require("../"),
    chai = require("chai"),
    expect = chai.expect;

chai.should();

describe("Tokyo", function() {
    
    it("should have a working currentTime() method.", function() {
        fincal.tokyo.currentTime().should.be.an("object");
    });
    
    it("should have a working areMarketsOpenNow() method.", function() {
        fincal.tokyo.areMarketsOpenNow().should.be.a("boolean");
    });
    
});