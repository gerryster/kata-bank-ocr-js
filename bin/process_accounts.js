#!/usr/bin/env node

'use strict';

(function() {
  var AccountsReader = require("../accounts_reader.js");
  var fs = require('fs');

  var inputFile = process.argv[2];

  fs.readFile(inputFile, 'utf8', function(err, data){
    if (err) {
      console.error("Could not open file %s: %s", inputFile, err);
      process.exit(1);
    }
    var reader = new AccountsReader(data);
    var formattedAccounts = reader.accounts().map(function(act){ return act.format(); });
    console.log(formattedAccounts.join("\n"));
  });
}());
