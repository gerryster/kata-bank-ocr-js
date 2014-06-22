var Account = require("../account.js");

var assert = require("assert");

describe("Account.parse", function() {
  it("parses all zeros", function() {
    var zerosRaw =
      " _  _  _  _  _  _  _  _  _ \n" +
      "| || || || || || || || || |\n" +
      "|_||_||_||_||_||_||_||_||_|\n" +
      "                           \n";
    assert.equal(Account.parse(zerosRaw).number, "000000000");
  });

  it("parses all ones", function(){
    var onesRaw =
      "                           \n" +
      "  |  |  |  |  |  |  |  |  |\n" +
      "  |  |  |  |  |  |  |  |  |\n" +
      "                          \n";
    assert.equal(Account.parse(onesRaw).number, "111111111");
  });

  it("parses one through nine", function() {
    var raw =
      "    _  _     _  _  _  _  _ \n" +
      "  | _| _||_||_ |_   ||_||_|\n" +
      "  ||_  _|  | _||_|  ||_| _|\n" +
      "                           \n";
    assert.equal(Account.parse(raw).number, "123456789");
  });

});

describe("Account.isValid", function() {
  it("all ones is invalid", function() {
    assert.ok(!new Account("111111111").isValid());
  });

  it("345882865 is valid", function() {
    assert.ok(new Account("345882865").isValid());
  });

  it("457508000 is valid", function() {
    assert.ok(new Account("457508000").isValid());
  });
});
