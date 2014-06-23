'use strict';

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
      "                           \n";
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

describe("Account.format", function() {
  it("passes through a valid account", function() {
    var actString = "345882865";
    assert.equal(new Account(actString).format(), actString);
  });

  it("adds ILL to an illegible account", function() {
    assert.equal(new Account("?00000000").format(), "?00000000 ILL");
  });

  it("adds ERR to an invalid account", function() {
    assert.equal(new Account("664371495").format(), "664371495 ERR");
  });
});

describe("Account.rawDigit", function() {
  it("extracts the original raw digit", function() {
    var raw =
      "    _  _     _  _  _  _  _ \n" +
      "  | _| _||_||_ |_   ||_||_|\n" +
      "  ||_  _|  | _||_|  ||_| _|\n" +
      "                           \n";
    var act = Account.parse(raw);
    assert.equal(act.rawDigit(2), Account.VALUE_TO_RAW["3"]);
  });
});
