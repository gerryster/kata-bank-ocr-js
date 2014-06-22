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

function Account(number) {
  this.number = number
}

Account.parse = function(accountText){
  var parsedAccount = "";
  for(var digitPlace=0; digitPlace < 9; digitPlace++) {
    parsedAccount += RAW_TO_VALUE[extractRawDigit(digitPlace, accountText)]
  }

  return new Account(parsedAccount);
}

function extractRawDigit(position, accountText) {
  var CHARACTER_WIDTH = 3;
  var accountLines = accountText.split("\n");
  var extractedRawDigit = "";
  [0,1,2].forEach(function(lineNum) {
     extractedRawDigit += accountLines[lineNum].slice(position * CHARACTER_WIDTH, (position + 1) * CHARACTER_WIDTH);
  });

  return extractedRawDigit;
};

/*
* Returns a string of a raw digit string with newlines for pretty printing.
*/
function prettyRawDigit(rawDigit) {
  return [rawDigit.slice(0, 3), rawDigit.slice(3, 6), rawDigit.slice(6, 9)].join("\n");
}

module.exports = Account;
