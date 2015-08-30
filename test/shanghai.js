var fincal = require("../"),
    chai = require("chai"),
    expect = chai.expect;

chai.should();

describe("Shanghai", function() {
    
    it("should have a working currentTime() method.", function() {
        fincal.shanghai.currentTime().should.be.an("object");
    });
    
    it("should have a working areMarketsOpenNow() method.", function() {
        fincal.shanghai.areMarketsOpenNow().should.be.a("boolean");
    });
    
});