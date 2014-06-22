var assert = require("assert");
var AccountParser = require("../account_parser.js");

describe("AccountParser.parse", function() {
  it("parses all zeros", function() {
    var zerosRaw =
      " _  _  _  _  _  _  _  _  _ \n" +
      "| || || || || || || || || |\n" +
      "|_||_||_||_||_||_||_||_||_|\n" +
      "                           \n";
    assert.equal(AccountParser.parse(zerosRaw), "000000000");
  });

  it("parses all ones", function() {
    var onesRaw =
      "                           \n" +
      "  |  |  |  |  |  |  |  |  |\n" +
      "  |  |  |  |  |  |  |  |  |\n" +
      "                           \n";
    assert.equal(AccountParser.parse(onesRaw), "111111111");
  });

  it("parses one through nine", function() {
    var raw =
      "   _  _     _  _  _  _  _ \n" +
      " | _| _||_||_ |_   ||_||_|\n" +
      " ||_  _|  | _||_|  ||_| _|\n" +
      "                          \n";
    assert.equal(AccountParser.parse(raw), "123456789");
  });
});
