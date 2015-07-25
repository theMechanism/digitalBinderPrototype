var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var _articles = {};
var _mappedToSearchable = {};

window.testWords = ['word', 'word', 'word', 'turd', 'gerd', 'haveYouHeard', 'bird', 'bird', 'turd'];

function WordSet(words){
	var self = this;
	this._set = {};

	this.addTo = function(words){
		_.forEach(words, function(word){
			self._set[word] = true;
		});
	}
	
	this.contains = function(word){
		return self._set.hasOwnProperty(word);
	}

	// build set on init
	this.addTo(words);
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
	WordSet: WordSet
}