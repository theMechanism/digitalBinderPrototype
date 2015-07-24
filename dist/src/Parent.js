var Parent = React.createClass({displayName: "Parent",
  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement("div", null, " This and this is my but the parent. "), 
        React.createElement(Child, {name: "child"})
      )
    )
  }
});