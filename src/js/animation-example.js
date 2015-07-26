var React = require('react/addons');


var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var TodoList = React.createClass({
  getInitialState: function() {
    return {items: ['hello', 'world', 'click', 'me']};
  },
  handleAdd: function() {
    var newItems =
      this.state.items.concat([prompt('Enter some text')]);
    this.setState({items: newItems});
  },
  handleRemove: function(i) {
    var newItems = this.state.items;
    newItems.splice(i, 1);
    this.setState({items: newItems});
  },
  render: function() {
    var items = this.state.items.map(function(item, i) {
      return (
        <div key={item} onClick={this.handleRemove.bind(this, i)}>
          {item}
        </div>
      );
    }.bind(this));
    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <ReactCSSTransitionGroup transitionName="example">
          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

var InitialAppear = React.createClass({
	render: function() {
    return (
      <ReactCSSTransitionGroup transitionName="example" transitionAppear={true}>
        <h1>Fading at Initial Mount</h1>
      </ReactCSSTransitionGroup>
    );
  }
});

var ImageCarousel = React.createClass({
  // propTypes: {
  //   imageSrc: React.PropTypes.string.isRequired
  // },
  getInitialState: function(){
  	return {
  		fakes: ['image1', 'image2', 'image3'],
  		index: 0
  	};
  },
  render: function() {
  	var i = this.state.index;
  	var fake = this.state.fakes[i];
    return (
      <div>
        <ReactCSSTransitionGroup transitionName="carousel">
          <h3>{ fake }</h3>
        </ReactCSSTransitionGroup>
        <button onClick={this.next}>Next</button>
      </div>
    );
  },
  next: function(){
  	// cons
  	var i = this.state.index + 1;
  	this.setState({index: i})
  }
});



module.exports = {
	TodoList: TodoList,
	InitialAppear: InitialAppear,
	ImageCarousel: ImageCarousel
}