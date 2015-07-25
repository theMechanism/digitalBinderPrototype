var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var _articles = {};
var _mappedToSearchable = {};

function Set(words){
	var self = this;
	this._set = {};
	
	// build set on init
	_.forEach(words, function(word){
		self._set[word] = true;
	});

	self.contains = function(word){
		return self._set.hasOwnProperty(word);
	}

}
function mapSearchableTextToSet(words){
	// accepts strings or arrays?
	// start w arrays
	var set = {};
	_.forEach(words, function(word){
		set[word] = true;
	});
	return set;

	// return object
	// return { 
	// 	id: id,
	// 	searchableText: 
	// 	{
	// 		// Set implementation
	// 		// individual words = true
	// 	}
	// }
}

// read only, never setting an article via app

var ArticleStore = {
	get: function(id){
		return 
	}
}

module.exports = {
	ArticleStore: ArticleStore,
	Set: Set
}