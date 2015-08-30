var fincal = require("../"),
    chai = require("chai"),
    expect = chai.expect;

chai.should();

describe("Hong Kong", function() {
    
    it("should have a working currentTime() method.", function() {
        fincal.hong_kong.currentTime().should.be.an("object");
    });
    
    it("should have a working areMarketsOpenNow() method.", function() {
        fincal.hong_kong.areMarketsOpenNow().should.be.a("boolean");
    });
    
});