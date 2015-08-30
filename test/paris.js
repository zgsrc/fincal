var fincal = require("../"),
    chai = require("chai"),
    expect = chai.expect;

chai.should();

describe("Paris", function() {
    
    it("should have a working currentTime() method.", function() {
        fincal.paris.currentTime().should.be.an("object");
    });
    
    it("should have a working areMarketsOpenNow() method.", function() {
        fincal.paris.areMarketsOpenNow().should.be.a("boolean");
    });
    
});