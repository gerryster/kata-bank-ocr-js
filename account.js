'use strict';

var RAW_TO_VALUE = {};
RAW_TO_VALUE[
  " _ " +
  "| |" +
  "|_|"
] = "0";
RAW_TO_VALUE[
  "   " +
  "  |" +
  "  |"
] = "1";
RAW_TO_VALUE[
  " _ " +
  " _|" +
  "|_ "
] = "2";
RAW_TO_VALUE[
  " _ " +
  " _|" +
  " _|"
] = "3";
RAW_TO_VALUE[
  "   " +
  "|_|" +
  "  |"
] = "4";
RAW_TO_VALUE[
  " _ " +
  "|_ " +
  " _|"
] = "5";
RAW_TO_VALUE[
  " _ " +
  "|_ " +
  "|_|"
] = "6";
RAW_TO_VALUE[
  " _ " +
  "  |" +
  "  |"
] = "7";
RAW_TO_VALUE[
  " _ " +
  "|_|" +
  "|_|"
] = "8";
RAW_TO_VALUE[
  " _ " +
  "|_|" +
  " _|"
] = "9";

var RAW_CHARACTER_WIDTH = 3;

function Account(number, rawAccountText) {
  this.number = number;
  this.rawAccountText = rawAccountText;
}

Account.parse = function(rawAccountText){
  var parsedAccount = "";
  for (var digitPlace = 0; digitPlace < 9; digitPlace++) {
    parsedAccount += RAW_TO_VALUE[extractRawDigit(digitPlace, rawAccountText)] || "?"
  }

  return new Account(parsedAccount, rawAccountText);
}

/*
  Returns true if all numbers in the account are readable.
*/
Account.prototype.isLegible = function() {
  return this.number.indexOf("?") < 0;
}

/*
  Determines if the account number is valid based off of a simple checksum.
*/
Account.prototype.isValid = function() {
  if(!this.isLegible()) { return false; }

  var sum = this.number.split('').reduce(
    function(previous,current,index) {
      return (9 - index) * current + previous;
    }, 0);
  return (sum % 11) === 0;
}

/*
  Returns a formatted string version of the account.  The suffixes "ILL" and
  "ERR" are added to illegible and invalid accounts respectively.
*/
Account.prototype.format = function() {
  var suffix = "";
  if(!this.isLegible()) {
    suffix = " ILL";
  } else if(!this.isValid()) {
    suffix = " ERR";
  }
  return this.number + suffix;
}

/*
  Returns the original raw OCR'ed digit for the zero based position.
*/
Account.prototype.rawDigit = function(position) {
  return extractRawDigit(position, this.rawAccountText);
}

function extractRawDigit(position, accountText) {
  var accountLines = accountText.split("\n");
  var extractedRawDigit = "";
  [0,1,2].forEach(function(lineNum) {
     var start = position * RAW_CHARACTER_WIDTH;
     var end = (position + 1) * RAW_CHARACTER_WIDTH;
     extractedRawDigit += accountLines[lineNum].slice(start, end);
  });

  return extractedRawDigit;
};

/*
  Returns a string of a raw digit string with newlines for pretty printing.
*/
function prettyRawDigit(rawDigit) {
  return [rawDigit.slice(0, 3), rawDigit.slice(3, 6), rawDigit.slice(6, 9)].join("\n");
}

module.exports = Account;
