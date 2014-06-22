var assert = require("assert");
var AccountParser = require("../account_parser.js");

describe("AccountParser.parse", function() {
  it("parses all zeros", function() {
    var zerosRaw =
      " _  _  _  _  _  _  _  _  _ \n" +
      "| || || || || || || || || |\n" +
      "|_||_||_||_||_||_||_||_||_|\n" +
      "                           \n";
    assert.equal(AccountParser.parse(zerosRaw), 000000000)
  });
});
