var Account = require("./account.js");

var RAW_ACCOUNT_LINE_HEIGHT = 4;

/*
  Reads the account numbers from raw scanned data.

  fileData: the string contents of the scanned accounts file
*/
function AccountsReader(fileData) {
  this.fileData = fileData;
}

/*
  Returns an array of the parsed Accounts.
*/
AccountsReader.prototype.accounts = function() {
  var inputLines = this.fileData.split("\n");
  var recordBuffer = [];
  var accounts = [];

  inputLines.forEach(function(inputLine){
    recordBuffer.push(inputLine);
    if(recordBuffer.length === RAW_ACCOUNT_LINE_HEIGHT) {
      accounts.push(Account.parse(recordBuffer.join("\n")));
      recordBuffer = [];
    }
  });

  return accounts;
}

module.exports = AccountsReader;
