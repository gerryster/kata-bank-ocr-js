exports.parse = function(accountText){
  var parsedAccount = "";
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

  if(RAW_TO_VALUE[extractRawDigit(0, accountText)] === "0") {
    return "000000000";
  }
  else {
    return "111111111";
  }
}

var extractRawDigit = function(position, accountText) {
  var CHARACTER_WIDTH = 3;
  var accountLines = accountText.split("\n");
  var extractedRawDigit = "";
  [0,1,2].forEach(function(lineNum) {
     extractedRawDigit += accountLines[lineNum].slice(position * CHARACTER_WIDTH, (position + 1) * CHARACTER_WIDTH);
  });

  return extractedRawDigit;
};
