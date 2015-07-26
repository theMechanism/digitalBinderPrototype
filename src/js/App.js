var React = require('react/addons');
// var articleFilter = require('./utilities/articleFilter');

// var DigitalBinder = require('./components/digitalBinder');

// var mockDocs = require('./../assets/documents');

// window.Faker = require('faker');
// window.WordSet = require('./stores/articleStore').WordSet;

// React.render(<DigitalBinder articles={mockDocs(6)} />, document.getElementById('app'));

var TodoList = require('./animation-example').TodoList;

var InitialAppear = require('./animation-example').InitialAppear;

var ImageCarousel = require('./animation-example').ImageCarousel;

React.render(<ImageCarousel />, document.getElementById('app'));