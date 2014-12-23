var React;
var Header= React.createClass({displayName: "Header",
  render: function(){
    return( React.createElement("div", null, " ", React.createElement("h1", null, "Agendakar"), " "));
  }
});

var Evenement = React.createClass({displayName: "Evenement",
  render: function(){
    return(
      React.createElement("li", null, 
        React.createElement("a", {href: "#"}, " titre ")
      )
    );
  }
});

var Liste= React.createClass({displayName: "Liste",
  render: function(){
    return(
      React.createElement("div", null, 
        React.createElement("h1", null, "Liste"), 
        React.createElement(Evenement, null), 
        React.createElement(Evenement, null), 
        React.createElement(Evenement, null), 
        React.createElement(Evenement, null)
      )
    );
  }
});

var Footer= React.createClass({displayName: "Footer",
  render: function(){
    return( React.createElement("div", null, " ", React.createElement("h1", null, "Footer"), " "));
  }
});

var AgendakarWidget= React.createClass({
  displayName: 'agendakar-widget',

  render: function(){
    var styles = {
      width: '300px',
      height: '400px',
      border: '1px solid #A3ABAC',
      float: 'right'
    };
    return(
      React.createElement("div", {style: styles}, 
        React.createElement(Header, null), 
        React.createElement(Liste, null), 
        React.createElement(Footer, null)
      )
    );
  }
});

React.render(
  React.createElement(AgendakarWidget, null), document.getElementById('content')
);
