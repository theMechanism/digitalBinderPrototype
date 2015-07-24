var _ = require('lodash');

function articleFilter(params) {
  var collection = params.collection;
  var propsToSearch = params.propsToSearch;
  var targetVals = params.targetVals;

  var passingArticleIds = [];
  
  // assume we are searching exclusively values containing text
  _.forEach(collection, function(testObj){
    var id = testObj.id;
    var valsString = stringifyVals(testObj, propsToSearch);
    
    _.forEach(targetVals, function(val){
      if ( _.includes(valsString, val) ){
        return passingArticleIds.push(id);
      }
    });  
  });

  return passingArticleIds;
}

function stringifyVals(testObj, propsToSearch){
 
  var flatVals = [];

  propsToSearch.forEach(function(prop){
    switch(prop){
      case 'title':
        flatVals.push(testObj.title);
        break;
      case 'abstract':
        _.forEach(testObj.abstract, function(ab){
          flatVals.push(ab.heading, ab.content);
        });
        break;
      case 'abstract.heading' :
        _.forEach(testObj.abstract, function(ab){
          flatVals.push(ab.heading);
        });
        break;
      case 'abstract.content' :
        _.forEach(testObj.abstract, function(ab){
          flatVals.push(ab.content);
        });
        break;
      case 'summary':
        _.forEach(testObj.summary, function(sum){
          flatVals.push(sum);
        });
        break;
    }
  });
  return flatVals.join();
}

module.exports = articleFilter;