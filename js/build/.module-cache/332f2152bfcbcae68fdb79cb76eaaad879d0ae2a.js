var React;
var Header= React.createClass({
  displayName: "Header",

  logo_url: "http://agendakar.com/assets/logo-327ec88839272b08eb7b40fe82d636de.png",
  render: function(){
    var style = {
      width: '60px;',
      height: '60px;',
      background: '#fff;',
      'border-radius': '1000px;',
      display: 'block;',
      'float': 'left;',
      margin: '2px;'
    };

    var img_style = {
      width:'50px;',
      margin:'6px;'
    };

    return(
      React.createElement("div", null, 
        React.createElement("div", {style: style}, 
          React.createElement("img", {src: this.logo_url, style: img_style})
        ), 
        React.createElement("h1", null, this.props.titre)
      )
    );
  }
});

var Evenement = React.createClass({
  displayName: "Evenement",
  render: function(){
    var _style = {
      margin: '0px',
      padding: '0px',
      'font-size':'12px',
      width: '100%'
    }
    a = {
      margin:'0px',
      padding:'0px'
    };
    return(
      React.createElement("li", null, 
        React.createElement("div", null, 
        React.createElement("table", {style: _style}, 
          React.createElement("tr", null, 
            React.createElement("td", null, "Le 25-12-2014"), 
            React.createElement("td", null, "21:00")
          ), 
          React.createElement("tr", null, React.createElement("td", {colspan: "2"}, React.createElement("a", {href: "#", style: a}, " titre ")))
        )
        )
      )
    );
  }
});

var Liste= React.createClass({displayName: "Liste",
  render: function(){
    return(
      React.createElement("div", null, 
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
    var footer_style = {
      'border-top': '1px solid #DDD'
    },
    h2 = {
      'font-size': '16px;',
      'text-align': 'center;',
      'height': '20px;',
      'font-family': "'Dosis', sans-serif;",
      'font-weight': '100;',
      'text-transform': 'uppercase;',
      'background': '#a3abac;',
      'color': '#fff ;',
      'margin': '0px !important;',
      'padding': '5px 0px;',
      'text-decoration': 'none;'
    };
    return(
      React.createElement("div", {style: footer_style}, 
        React.createElement("a", {href: "http://www.agendakar.com", target: "_blank"}, 
          React.createElement("h2", {style: h2}, "aller sur agendakar")
        )
      )
    );
  }
});

var AgendakarWidget= React.createClass({
  displayName: 'agendakar-widget',

  loadEvent: function(){
    return(
      $.get(this.state.url).then(function(data){ return data; })
    );
  },

  getInitialState: function(){
    return {
      url: 'http://www.agendakar.com/api/events.json',
      isLoading: false
    };
  },

  componentDidMount: function(){
    this.setState({ isLoading: false });
  },

  render: function(){
    var styles = {
      width: '300px',
      height: '340px',
      float: 'right'
    };
    var toShow = {
      display: this.state.isLoading ? "block" : "none"
    };
    return(
      React.createElement("div", {style: styles}, 
        React.createElement(Header, {titre: "L'agenda cette semaine"}), 
        React.createElement("h1", {style: toShow}, "Chargement en cours ..."), 
        React.createElement(Liste, null), 
        React.createElement(Footer, null)
      )
    );
  }
});

React.render(
  React.createElement(AgendakarWidget, null), document.getElementById('content')
);
