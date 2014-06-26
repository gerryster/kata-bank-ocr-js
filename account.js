'use strict';

function Account(number, rawAccountText) {
  this.number = number;
  this.rawAccountText = rawAccountText;
}

Account.RAW_TO_VALUE = {};
Account.RAW_TO_VALUE[
  " _ " +
  "| |" +
  "|_|"
] = "0";
Account.RAW_TO_VALUE[
  "   " +
  "  |" +
  "  |"
] = "1";
Account.RAW_TO_VALUE[
  " _ " +
  " _|" +
  "|_ "
] = "2";
Account.RAW_TO_VALUE[
  " _ " +
  " _|" +
  " _|"
] = "3";
Account.RAW_TO_VALUE[
  "   " +
  "|_|" +
  "  |"
] = "4";
Account.RAW_TO_VALUE[
  " _ " +
  "|_ " +
  " _|"
] = "5";
Account.RAW_TO_VALUE[
  " _ " +
  "|_ " +
  "|_|"
] = "6";
Account.RAW_TO_VALUE[
  " _ " +
  "  |" +
  "  |"
] = "7";
Account.RAW_TO_VALUE[
  " _ " +
  "|_|" +
  "|_|"
] = "8";
Account.RAW_TO_VALUE[
  " _ " +
  "|_|" +
  " _|"
] = "9";

Account.VALUE_TO_RAW = {}
Object.keys(Account.RAW_TO_VALUE).forEach(
  function(raw) {
    Account.VALUE_TO_RAW[Account.RAW_TO_VALUE[raw]] = raw;
  }
);

var RAW_CHARACTER_WIDTH = 3;

Account.parse = function(rawAccountText){
  var parsedAccount = "";
  for (var digitPlace = 0; digitPlace < 9; digitPlace++) {
    parsedAccount += Account.RAW_TO_VALUE[extractRawDigit(digitPlace, rawAccountText)] || "?"
  }

  return new Account(parsedAccount, rawAccountText);
}

/*
  Given a raw digit, it returns the possible alternates which are only off by
  one stroke.
*/
Account.alternateDigits = function(incommingRawDigit) {
  var alternates = [];
  Object.keys(Account.RAW_TO_VALUE).forEach(function(rawDigit) {
    var diffCount = 0;
    for(var i = 0; i < rawDigit.length; i++) {
      if(incommingRawDigit.substr(i, 1) != rawDigit.substr(i, 1)) {
        diffCount++;
      }
      if(diffCount > 1) {
        break;
      }
    }
    if(diffCount === 1) {
      alternates.push(Account.RAW_TO_VALUE[rawDigit]);
    }
  });
  return alternates;
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

/*
  For invalid or illegible accounts, this calculates possible alternative account numbers.
*/
Account.prototype.alternates = function() {
  var alternates = [];
  if(this.isValid()) { return alternates; }

  for(var currentPos = 0; currentPos <= 9; currentPos++) {
    var altDigits = Account.alternateDigits(extractRawDigit(currentPos, this.rawAccountText));
    altDigits.forEach(function (altDigit) {
      var accountNum = this.number.substr(0, currentPos) + altDigit + this.number.substr(currentPos + 1);
      var possibleAccount = new Account(accountNum);
      if(possibleAccount.isValid()) {
        alternates.push(possibleAccount.number);
      }
    }, this);
  }
  return alternates;
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
