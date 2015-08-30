var fincal = require("../"),
    chai = require("chai"),
    expect = chai.expect;

chai.should();

describe("New York", function() {
    
    it("should have a working currentTime() method.", function() {
        fincal.new_york.currentTime().should.be.an("object");
    });
    
    it("should have a working areMarketsOpenNow() method.", function() {
        fincal.new_york.areMarketsOpenNow().should.be.a("boolean");
    });
    
});