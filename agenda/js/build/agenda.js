(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function loadScript(url, callback) {
  var head    = document.getElementsByTagName('head')[0];
  var script  = document.createElement('script');
  script.type = 'text/javascript';
  script.src  = url;
  script.async= 1;

  script.onreadystatechange = callback;
  script.onload = callback;

  head.appendChild(script);
}

function load_police(url){
  var h = document.getElementsByTagName('head')[0],
      d = document.createElement('link');
  d.type= 'text/css';
  d.rel ='stylesheet';
  d.href= url;
  h.appendChild(d);
}

function loadPolices(){
  load_police("css/main.css");
  load_police("http://fonts.googleapis.com/css?family=Dosis");
  load_police("http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css");
}

function start(){
  var AgendakarWidget = require('./components/agendakar');
  var e   = document.getElementById('agendakar-agenda');
  var d   = e.attributes['data-el'].value;
  var _id = e.attributes['data-cid'].value;

  React.render(
    React.createElement(AgendakarWidget, {clientId: _id}), document.getElementById(d)
  );
}

loadPolices();
function load_react(){
  if( window.React === undefined ){
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react.min.js", start);
  }
}
function loadjQuery(){
  if( window.jQuery === undefined ){
    loadScript("https://code.jquery.com/jquery-1.11.2.min.js", load_react);
  }
  else {
    load_react();
  }
}

loadjQuery();

},{"./components/agendakar":2}],2:[function(require,module,exports){
var Header = require('./header');
var Liste  = require('./liste');
var Footer = require('./footer');
var Special= require('./special');

var AgendakarWidget= React.createClass({
  displayName: 'agendakar-widget',

  getInitialState: function(){
    return {
      url        : 'http://www.agendakar.com/api/v1/events.json',
      show       : false,
      item       : null,
      data       : { 'client_id' : this.props.client_id },
      selected   : false,
      isLoading  : true,
      evenements : []
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
        show       : false,
        item       : null,
        evenements : data
      });
    }.bind(this))
    .fail(function(){ alert("Erreur"); });
  },

  onEvenementClick: function(index){
    this.setState({
      show    : true,
      item    : this.state.evenements[index]
    });
    return false;
  },

  onSpecialClose: function(){
    this.setState({
      show : false,
      item : null
    });
  },

  render: function(){
    var toShow = {
      textAlign : 'center',
      display   : this.state.isLoading ? 'block' : 'none'
    };

    return(
      React.createElement("div", {id: "agd-widget"}, 
        React.createElement(Header, {titre: "cette semaine a Dakar"}), 
        React.createElement("h2", {style: toShow}, "Chargement en cours ..."), 

        React.createElement(Special, {item: this.state.item, 
                 show: this.state.show, 
                 clientId: this.props.clientId, 
                 onClose: this.onSpecialClose}), 

         this.state.show ? null :
        React.createElement(Liste, {evenements: this.state.evenements, 
               onEvenementClick: this.onEvenementClick}), 
        
        React.createElement(Footer, null)
      )
    );
  }
});

module.exports = AgendakarWidget;

},{"./footer":5,"./header":6,"./liste":7,"./special":8}],3:[function(require,module,exports){
var Endroit = React.createClass({displayName: "Endroit",
  render: function(){
    return(
      React.createElement("p", {className: "endroit"}, 
        React.createElement("i", {className: "fa fa-map-marker"}), " ",  this.props.nom
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

  get_url: function(slug){
    var id = this.props.clientId;
    return 'http://www.agendakar.com/agenda/' + slug + '?clientId=' + id;
  },

  getInitialState: function(){ return { iscollapsed: true }; },

  clickHandler: function(e){
    this.props.onClick(this.props.index);
    e.preventDefault();
  },

  render: function(){
    var classes = this.state.iscollapsed ? 'lieu hidden' : 'lieu' ,
    _event = this.props.event;

    return(
      React.createElement("li", {className: "item", onClick: this.clickHandler}, 
        React.createElement("div", null, 
          React.createElement("table", {className: "evenement"}, 
            React.createElement("tr", null, 
            React.createElement("td", null, 
              React.createElement("div", {className: "dateheure"}, 
                React.createElement("div", {className: "date"}, "Le ", _event.date), 
                React.createElement("div", {className: "heure"}, _event.heure)
              )
              )
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, _event.nom)
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
    return(
      React.createElement("div", {id: "agd-footer"}, 
        React.createElement("a", {href: "http://www.agendakar.com", target: "_blank"}, 
          React.createElement("h2", {className: "h"}, "voir tous les evenements")
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
    return(
      React.createElement("div", {id: "agd-header"}, 
        React.createElement("div", {id: "agd-logo"}, 
          React.createElement("a", {href: "http://www.agendakar.com", target: "_blank"}, 
            React.createElement("img", {src: this.logo_url, title: "www.agendakar.com", alt: "www.agendakar.com"})
          )
        ), 
        React.createElement("h1", {id: "agd-txt"}, this.props.titre)
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

  onClick: function(index){
    this.props.onEvenementClick(index);
  },

  getInitialState: function(){
    return {
      selected: false,
      show    : false,
      item    : null
    };
  },

  render: function(){
    var liste   = [];
    var _events = this.props.evenements;

    _events.map(function(d){
      var _i =  _events.indexOf(d);
      liste.push(
        React.createElement(Evenement, {key: d.slug, 
                   event: d, 
                   index: _i, 
                   clientId: this.props.clientId, 
                   onClick: this.onClick})
      )
    }.bind(this));

    return(
      React.createElement("div", {id: "agd-liste"}, 
        liste
      )
    );
  }
});

module.exports = Liste;

},{"./evenement":4}],8:[function(require,module,exports){
var Special = React.createClass({displayName: "Special",

  get_url: function(){
    var link = "http://www.agendakar.com/agenda/" + this.props.item.slug;
        link+= "?clientId=" + this.props.clientId;

    return link;
  },

  render: function(){
    var classes = this.props.show ? '' : 'hidden',
        _item   = this.props.item;
    return(
      _item ?
      React.createElement("div", {className: classes, id: "agd-special"}, 
        React.createElement("div", {id: "s-header"}, 
          React.createElement("div", {id: "date"}
          ), 
          React.createElement("div", {id: "close"}, 
            React.createElement("i", {className: "fa fa-remove", onClick: this.props.onClose})
          )
        ), 
        React.createElement("div", {id: "content"}, 
          React.createElement("div", {className: "titre"}, " ", _item.nom, " "), 
          React.createElement("div", {id: "image"}, 
            React.createElement("img", {src: _item.photo_url, alt: _item.nom, title: _item.nom}), 
            React.createElement("br", null), 
            React.createElement("table", null, 
              React.createElement("tr", null, 
                React.createElement("td", {className: "date"}, _item.date), 
                React.createElement("td", {className: "heure"}, _item.heure)
              ), 
              React.createElement("tr", null, 
                React.createElement("td", {colSpan: "2"}, _item.endroit)
              )
            )
          ), 
          React.createElement("div", {id: "extra"}, 
            React.createElement("a", {href: this.get_url(), target: "_blank"}, 
              React.createElement("i", {className: "fa fa-external-link"}), 
              "plus d'infos sur www.agendakar.com"
            )
          )
        )
      )
      : null
    );
  }
});

module.exports = Special;

},{}]},{},[1]);
