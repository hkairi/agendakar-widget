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
    var p_style = {
      margin: '0px',
      padding: '0px',
      'font-size':'12px'
    };
    return(
      React.createElement("li", null, 
        React.createElement("div", null, 
        React.createElement("p", {style: p_style}, "Le 25-12-2014  a 21:00"), 
        React.createElement("p", {style: p_style}, React.createElement("a", {href: "#"}, " titre "))
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
    };
    return(
      React.createElement("div", {style: footer_style}, 
        React.createElement("a", {href: "http://www.agendakar.com", target: "_blank"}, 
          React.createElement("h2", null, "aller sur agendakar")
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
      height: '300px',
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
