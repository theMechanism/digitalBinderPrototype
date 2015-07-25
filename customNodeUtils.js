var fs = require('fs');

// NOTE - non recursive -- similar to rails sprockets //= require_tree
var getFileNames = function(dir){
  var results = [];
  fs.readdirSync(dir).forEach(function(file) {
      results.push(file);  
  });
  return results;
}

module.exports = {
  getFileNames: getFileNames
}