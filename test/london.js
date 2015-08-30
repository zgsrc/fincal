var fincal = require("../"),
    chai = require("chai"),
    expect = chai.expect;

chai.should();

describe("London", function() {
    
    it("should have a working currentTime() method.", function() {
        fincal.london.currentTime().should.be.an("object");
    });
    
    it("should have a working areMarketsOpenNow() method.", function() {
        fincal.london.areMarketsOpenNow().should.be.a("boolean");
    });
    
});