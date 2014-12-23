var React;
var Header= React.createClass({
  displayName: "Header",
  logo_url: "http://agendakar.com/assets/logo-327ec88839272b08eb7b40fe82d636de.png",

  render: function(){
    var style = {
      width: '60px;',
      height: '60px;',
      background: '#fff;',
      borderRadius: '1000px;',
      display: 'block;',
      float: 'left;',
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
      fontSize:'12px',
      width: '100%'
    }
    a = { margin:'0px', padding:'0px' };

    return(
      React.createElement("li", null, 
        React.createElement("div", null, 
        React.createElement("table", {style: _style}, 
          React.createElement("tr", null, 
            React.createElement("td", null, "Le ", this.props.date), 
            React.createElement("td", null, this.props.heure)
          ), 
          React.createElement("tr", null, React.createElement("td", {colSpan: "2"}, React.createElement("a", {href: "#", style: a}, " ", this.props.nom, " ")))
        )
        )
      )
    );
  }
});

var Liste= React.createClass({
  displayName: 'Agenda',

  render: function(){
    var toShow = { display: this.state.isLoading ? "block" : "none" };
    return(
      React.createElement("div", null, 
        React.createElement("h1", {style: toShow}, "Chargement en cours ..."), 
        this.state.elements
      )
    );
  }
});

var Footer= React.createClass({displayName: "Footer",
  render: function(){
    var footer_style = {
      borderTop: '1px solid #DDD'
    },
    h2 = {
      fontSize: '16px;',
      textAlign: 'center;',
      height: '20px;',
      fontFamily: "'Dosis', sans-serif;",
      fontweight: '100;',
      textTransform: 'uppercase;',
      background: '#a3abac;',
      color: '#fff ;',
      margin: '0px !important;',
      padding: '5px 0px;',
      textDecoration: 'none;'
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
  evenements: [],
  isLoading: true,
  url: 'http://www.agendakar.com/api/events.json',

  getInitialState: function(){
    return {
      evenements: [],
      isLoading: false,
      api_url: 'http://localhost:3000/api/events.json'
    }
  },

  componentDidMount: function(){
    var self = this;
    $.ajax({
      url: this.state.url,
      dataType: 'json',
      crossDomain: true,
    })
    .done(function(data){ self.setState({ isLoading: true, evenements: data }); })
    .fail(function(){ alert("oups"); });
  },
  render: function(){
    var styles = {
      width: '300px',
      height: '330px',
      float: 'right'
    };
    return(
      React.createElement("div", {style: styles}, 
        React.createElement(Header, {titre: "L'agenda cette semaine"}), 
        React.createElement(Liste, {evenements: this.state.evenements}), 
        React.createElement(Footer, null)
      )
    );
  }
});

React.render(
  React.createElement(AgendakarWidget, null), document.getElementById('content')
);
