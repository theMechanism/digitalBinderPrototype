var React = require('react');
var articleFilter = require('./utilities/articleFilter');

var DigitalBinder = require('./components/digitalBinder');

var mockDocs = require('./../assets/documents');

window.Faker = require('faker');
window.WordSet = require('./stores/articleStore').WordSet;

React.render(<DigitalBinder articles={mockDocs(6)} />, document.getElementById('app'));