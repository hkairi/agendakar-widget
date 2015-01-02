(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AgendakarWidget = require('./components/agendakar');

var e   = document.getElementById('agendakar-widget');
var d   = e.attributes['el'].value;
var _id = e.attributes['cid'].value;
var c   = e.attributes['cats'].value.split(",");

React.render(
  React.createElement(AgendakarWidget, {clientId: _id, categories: c}), document.getElementById(d)
);

},{"./components/agendakar":2}],2:[function(require,module,exports){
var Header = require('./header');
var Liste  = require('./liste');
var Footer = require('./footer');

var AgendakarWidget= React.createClass({
  displayName: 'agendakar-widget',

  getInitialState: function(){
    return {
      evenements : [],
      isLoading  : true,
      data       : { 'client_id' : this.props.client_id, 'categories' : this.props.categories },
      url        : 'http://www.agendakar.com/api/events.json'
    };
  },

  fetchData: function(){
    var data =  this.state.data;
    return(
      $.ajax({
        url: this.state.url,
        data: data,
        dataType: 'json'
      })
    );
  },

  componentDidMount: function(){
    this.fetchData()
    .done(function(data){
      this.setState({
        isLoading  : false,
        evenements : data
      });
    }.bind(this))
    .fail(function(){ alert("Erreur de connexion"); });
  },

  render: function(){
    var styles = {
      fontFamily : "'Dosis', sans-serif",
      width      : '300px',
      height     : '330px',
      float      : 'right'
    },
    toShow = { textAlign : 'center', display   : this.state.isLoading ? 'block' : 'none' };

    return(
      React.createElement("div", {style: styles}, 
        React.createElement(Header, {titre: "L'agenda cette semaine"}), 
        React.createElement("h2", {style: toShow}, "Chargement en cours ..."), 
        React.createElement(Liste, {evenements: this.state.evenements}), 
        React.createElement(Footer, null)
      )
    );
  }
});

module.exports = AgendakarWidget;

},{"./footer":5,"./header":6,"./liste":7}],3:[function(require,module,exports){
var Endroit = React.createClass({displayName: "Endroit",
  render: function(){
    var s = { margin : '2px 0', color : '#bd1d2b' },
        p = { margin : '0', padding : '0' };
    return(
      React.createElement("p", {style: p}, 
        React.createElement("i", {className: "fa fa-map-marker", style: s}), " ",  this.props.nom
      )
    )
  }
});

module.exports = Endroit;

},{}],4:[function(require,module,exports){
var Endroit = require('./endroit');

var Evenement = React.createClass({
  displayName : "Evenement",
  iscollapsed : null,

  get_url: function(slug){ return 'http://www.agendakar.com/agenda/' + slug; },

  handleClick: function(){ this.setState({ iscollapsed: ! this.state.iscollapsed }); },

  getInitialState: function(){ return { iscollapsed: true }; },

  render: function(){
    var _style = {
      width    : '100%',
      margin   : '0',
      cursor   : 'pointer',
      padding  : '0px',
      fontSize : '12px'
    },
    li_style = {
      color        : '#000',
      listStyle    : 'none',
      margin       : '2px 0px',
      borderBottom : '1px solid #A3ABAC',
      height       : this.state.iscollapsed ? 'auto' : '105px'
    },
    c = { display : this.state.iscollapsed ? 'none' : 'block' },
    d = {
      display : this.state.iscollapsed ? 'none' : 'block',
      margin  : '0px auto',
      width   : '100%'
    },
    e = {
      display : this.state.iscollapsed ? 'none' : 'block',
      margin  : '6px auto 0 auto',
      textAlign: 'center',
      width   : '100%'
    },
    a = {
      color          : '#000',
      margin         : '0px',
      padding        : '0px',
      textDecoration :  'none'
    },
    st = { textAlign: 'right' },
    ac = {
      color          : '#000',
      width          : '100%',
      textAlign      : 'center',
      textDecoration :  'none'
    },
    _event = this.props.event;

    return(
      React.createElement("li", {style: li_style, onClick: this.handleClick}, 
        React.createElement("div", null, 
          React.createElement("table", {style: _style}, 
            React.createElement("tr", null, 
              React.createElement("td", null, "Le ", _event.date), 
              React.createElement("td", {style: st}, _event.heure)
            ), 
            React.createElement("tr", null, 
              React.createElement("td", {colSpan: "2"}, 
                React.createElement("a", {href: this.get_url(_event.slug), style: a, target: "_blank"}, 
                  _event.nom
                )
              )
           ), 
           React.createElement("tr", {style: d}, 
              React.createElement("td", null, React.createElement(Endroit, {nom: _event.endroit})), 
              React.createElement("td", {style: st}, _event.quartier)
            )
          ), 
          React.createElement("div", {style: e}, 
            React.createElement("a", {href: this.get_url(_event.slug), style: ac, target: "_blank"}, 
              React.createElement("i", {className: "fa fa-external-link"}), 
              "plus d'infos sur www.agendakar.com"
            )
          )
        )
      )
    );
  }
});

module.exports = Evenement;

},{"./endroit":3}],5:[function(require,module,exports){
var Footer= React.createClass({displayName: "Footer",
  render: function(){
    var footer_style = { borderTop: '1px solid #DDD' },
        a = { textDecoration: 'none' },
    h2 = {
      fontSize       : '16px;',
      textAlign      : 'center;',
      height         : '20px;',
      fontFamily     : "'Dosis', sans-serif;",
      fontweight     : '100;',
      textTransform  : 'uppercase;',
      background     : '#a3abac;',
      color          : '#fff ;',
      margin         : '0px !important;',
      padding        : '5px 0px;',
      textDecoration : 'none;'
    };

    return(
      React.createElement("div", {style: footer_style}, 
        React.createElement("a", {href: "http://www.agendakar.com", target: "_blank", style: a}, 
          React.createElement("h2", {style: h2}, "aller sur agendakar")
        )
      )
    );
  }
});

module.exports = Footer;

},{}],6:[function(require,module,exports){
var Header= React.createClass({
  displayName : "Header",
  logo_url    : "http://agendakar.com/assets/logo-327ec88839272b08eb7b40fe82d636de.png",

  render: function(){
    var h = {
      fontSize       : '10px;',
      height         : '65px;',
      lineHeight     : '65px;',
      fontWeight     : '100;',
      textTransform  : 'uppercase;',
      background     : '#396eb5;',
      color          : '#fff ;',
      margin         : '0px !important;'
    };
    var style = {
      width        : '60px;',
      height       : '60px;',
      background   : '#fff;',
      borderRadius : '1000px;',
      display      : 'block;',
      float        : 'left;',
      margin       : '2px;'
    };
    var img_style = {
      width  : '50px;',
      margin : '6px;'
    };

    return(
      React.createElement("div", {style: h}, 
        React.createElement("div", {style: style}, 
          React.createElement("a", {href: "http://www.agendakar.com", target: "_blank"}, 
            React.createElement("img", {src: this.logo_url, style: img_style})
          )
        ), 
        React.createElement("h1", null, this.props.titre)
      )
    );
  }
});

module.exports = Header;

},{}],7:[function(require,module,exports){
var Evenement = require('./evenement');

// Liste Component
var Liste = React.createClass({
  displayName: 'Agenda',

  render: function(){
    var l = {
      height   : '230px',
      overflow : 'auto'
    },
    liste = [];

    this.props.evenements.map(function(d){
      liste.push(
        React.createElement(Evenement, {key: d.slug, event: d})
      )
    });

    return(
      React.createElement("div", {style: l}, 
        liste
      )
    );
  }
});

module.exports = Liste;

},{"./evenement":4}]},{},[1]);
