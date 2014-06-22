var assert = require("assert");
var AccountsReader = require("../accounts_reader.js");

describe("AccountsReader", function() {
  it("returns an empty list of accounts for empty input", function() {
    var ar = new AccountsReader("");
    assert.deepEqual(ar.accounts(), []);
  });

  it("reads two accounts", function() {
    var fileData =
      " _  _  _  _  _  _  _  _  _ \n" +
      "| || || || || || || || || |\n" +
      "|_||_||_||_||_||_||_||_||_|\n" +
      "                           \n" +
      "                           \n" +
      "  |  |  |  |  |  |  |  |  |\n" +
      "  |  |  |  |  |  |  |  |  |\n" +
      "                           \n";
    var ar = new AccountsReader(fileData);
    assert.deepEqual(
        ar.accounts().map(function(act){ return act.number; }), ["000000000", "111111111"]);
  });
});
