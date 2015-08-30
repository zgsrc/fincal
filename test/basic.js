var fincal = require("../"),
    chai = require("chai"),
    expect = chai.expect;

chai.should();

describe("Package", function() {
    
    it("should have a New York locale", function() {
        expect(fincal.new_york).to.be.ok;
    });
    
    it("should have a London locale", function() {
        expect(fincal.london).to.be.ok;
    });
    
    it("should have a Paris locale", function() {
        expect(fincal.paris).to.be.ok;
    });
    
    it("should have a Berlin locale", function() {
        expect(fincal.berlin).to.be.ok;
    });
    
    it("should have a Hong Kong locale", function() {
        expect(fincal.hong_kong).to.be.ok;
    });
    
    it("should have a Shanghai locale", function() {
        expect(fincal.shanghai).to.be.ok;
    });
    
    it("should have a Tokyo locale", function() {
        expect(fincal.tokyo).to.be.ok;
    });
    
    it("should have a Sydney locale", function() {
        expect(fincal.sydney).to.be.ok;
    });
    
});