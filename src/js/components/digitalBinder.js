var React = require('react');
var _ = require('lodash');
var articleFilter = require('../utilities/articleFilter');

var DigitalBinder = React.createClass({

  render: function() {
    var ml = this.menuList();
    return (
      <div className="row">
        <aside className="col-xs-3 col-sm-4 col-md-4">
          <h3>Menu</h3>
          <ul>
            {ml}
          </ul>
          {this.searchComponent()}
        </aside>
        <main className="col-xs-9 col-sm-8 col-md-8">
          <article>
            {this.welcomeOrContent()}
          </article>
        </main>
      </div>
    );
  },
  searchComponent: function(){
    return (
      <div>
        <input type="text" placeholder="search content" onChange={this.handleSearchInput} />
        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
        <button className="btn btn-xs btn-info">
          Advanced search options
        </button>
      </div>
    );
  },
  handleSearchInput: function(e){
    this.setState({searchText: e.target.value},this.updateSubset());
  },
  updateSubset: function(){
    var arts = this.props.articles;
    var artSubset;
    if (this.state.searchText === ''){
      artSubset = arts;
    } else {
      var passingIds = articleFilter({
        collection: arts,
        propsToSearch: ['title', 'abstract', 'summary'],// currently search all
        targetVals: [this.state.searchText]
      });
      artSubset = passingIds.map(function(id){
        return _.find(arts, function(a){
          return a.id === id;
        })
      });
    }
    this.setState({artSubset: artSubset});
  },
  getInitialState: function(){
    return {
      selected: undefined,
      artSubset: this.props.articles,
      subView: undefined
    };
  },
  menuList: function(){ 
    var self = this;
    return this.state.artSubset.map(function(art){
      return (
        <li key={art.id}><a onClick={self.handleSelect}>{art.title}</a></li>
      );
    }); 
  },
  handleSelect: function(e){
    var selected = _.findWhere(this.props.articles, {
      title: e.target.text
    });
    if (selected === this.state.selected){
      return;
    } else {
      var state = {
        selected: selected,
        subView: 'Abstact'
      }
      this.setState(state);
    }
  },
  articleContents: function(){
    var selected = this.state.selected;
    return (
      <div>
        <h2>{selected.title}</h2>
        <button onClick={this.handleSubview} className="btn btn-xs btn-primary">
          Abstact 
        </button>
        <button onClick={this.handleSubview} className="btn btn-xs btn-default">
          Summary 
        </button>
        <button onClick={this.handleSubview} className="btn btn-xs btn-info">
          PDF <span className="glyphicon glyphicon-duplicate" aria-hidden="true"></span>
        </button>
        {this.formatSubview()}
      </div>
    );
  },
  formatSubview: function(){
    var selected = this.state.selected;
    switch (this.state.subView){
      case 'Summary':
        return this.summaryView(selected.summary);
        break;
      case 'PDF ':
        return this.pdfView(selected.pdf);
        break;
      default:
        return this.abstractView(selected.abstract);
        break;
    }
  },
  handleSubview: function(e){
    var subView = e.target.innerText;
    this.setState({subView: subView});
  },
  abstractView: function(abstract){
    var self = this;
    // abstract is array of obj with heading + content props
    var sections = abstract.map(function(section){
      return (
        <div key={section.content}>
          <h4>{section.heading}</h4>
          <p>{section.content}</p>
        </div>
      );
    });
    return sections;
  },
  pdfView: function(url){
    return (
      <div>
        <img src={url} alt=""/>
      </div>
    );
  },
  summaryView: function(summary){
    // summary also array
    var items = summary.map(function(sum){
      return (
        <li>
          {sum}
        </li>
      );
    })
    return (
      <ul>
        {items}
      </ul>
    );
  },
  welcomeOrContent: function(){
    return this.state.selected ? this.articleContents() : this.welcomeContent();
  },
  welcomeContent: function(){
    return(
      <div>
        <h1>Welcome to the ERS Digital Binder</h1>
        <p>Do some stuff and be a nice person.</p>
      </div>
    );
  },
  componentDidMount: function(){
    console.log(this.props);
    // this.clack();
  }
});

module.exports = DigitalBinder;
