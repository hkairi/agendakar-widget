var React;
var Header= React.createClass({displayName: "Header",
  render: function(){
    return(
      React.createElement("div", null, 
      React.createElement("h1", null, "Agendakar")
      )
    );
  }
});
var AgendakarWidget= React.createClass({
  displayName: 'agendakar-widget',

  render: function(){
    return(
      React.createElement("div", null, 
      React.createElement(Header, null)
      )
    );
  }
});

React.render(
  React.createElement(AgendakarWidget, null), document.getElementById('content')
);
