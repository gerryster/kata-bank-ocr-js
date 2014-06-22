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

  describe("illegibility", function() {
    var illegibleRaw =
      "    _  _  _  _  _  _  _  _ \n" +
      "| || || || || || || || || |\n" +
      "|_||_|| ||_||_||_||_||_||_|\n" +
      "                           \n";
    var act = Account.parse(illegibleRaw);

    it("replaces illegible digits with question marks", function() {
      assert.equal(act.number, "?0?000000");
    });

    it("is not legible", function() {
      assert.ok(!act.isLegible());
    });

    it("is not valid", function() {
      assert.ok(!act.isValid());
    });
  });
});

describe("Account.isValid", function() {
  it("all ones is invalid", function() {
    assert.ok(!new Account("111111111").isValid());
  });

  it("345882865 is valid", function() {
    assert.ok(new Account("345882865").isValid());
  });

  it("457508000 is valid and legible", function() {
    var act = new Account("457508000");
    assert.ok(act.isValid());
    assert.ok(act.isLegible());
  });
});
