#!/usr/bin/env node

(function() {
  var fileData;
  var AccountsReader = require("../accounts_reader.js");
  var fs = require('fs');
  var inputFile = process.argv[2];

  //Reading file test.txt
  fs.readFile(inputFile,'utf8',function(err,data){
    if(err) {
      console.error("Could not open file %s: %s", inputFile, err);
      process.exit(1);
   }
   //Calling replacement function
   reader = new AccountsReader(data);
   console.log("accounts: \n" + reader.accounts().join("\n") + "\n");
  });

}).call(this)
