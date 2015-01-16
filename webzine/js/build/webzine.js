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
  var WebzineWidget = require('./components/webzine');
  var e   = document.getElementById('agendakar-widget');
  var d   = e.attributes['data-el'].value;
  var _id = e.attributes['data-cid'].value;

  React.render(
    React.createElement(WebzineWidget, {clientId: _id}), document.getElementById(d)
  )
}
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
loadPolices();
loadjQuery();

},{"./components/webzine":7}],2:[function(require,module,exports){
var Article = React.createClass({
  displayName : "Article",

  get_url: function(slug){
    var id = this.props.clientId;
    return 'http://www.agendakar.com/webzine/' + slug + '?clientId=' + id;
  },

  clickHandler: function(){
    this.props.onClick(this.props.index);
  },

  render: function(){
    var _art = this.props.art;

    return(
      React.createElement("li", {className: "item", onClick: this.clickHandler}, 
        React.createElement("div", null, 
          React.createElement("table", {className: "article"}, 
            React.createElement("tr", null, 
              React.createElement("td", {colSpan: "2"}, _art.titre)
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, 
                React.createElement("div", {className: "dateheure"}, 
                  React.createElement("small", null, 
                  'publi' + String.fromCharCode(233) + ' le '
                  )
                )
              ), 
              React.createElement("td", {style: {textAlign: 'right', fontSize: 'small'}}, 
                React.createElement("b", null, _art.date_de_publication)
              )
            )
           )
        )
      )
    );
  }
});

module.exports = Article;

},{}],3:[function(require,module,exports){
var Article = require('./article');

var Articles = React.createClass({
  displayName: 'Webzine',

  onClick: function(index){
    this.props.onArticleClick(index);
  },

  getInitialState: function(){
    return {
      selected: false,
      show    : false,
      item    : null
    };
  },

  render: function(){
    var liste = [];
    var _arts = this.props.liste;

    _arts.map(function(d){
      var _i =  _arts.indexOf(d);
      liste.push(
        React.createElement(Article, {key: d.slug, 
                 art: d, 
                 index: _i, 
                 clientId: this.props.clientId, 
                 onClick: this.onClick})
      )
    }.bind(this));

    return(
      React.createElement("div", {id: "webzine-liste"}, 
        liste
      )
    );
  }
});

module.exports = Articles;

},{"./article":2}],4:[function(require,module,exports){
var Footer= React.createClass({displayName: "Footer",
  render: function(){
    return(
      React.createElement("div", {id: "webzine-footer"}, 
        React.createElement("a", {href: "http://www.agendakar.com/webzine", target: "_blank"}, 
          React.createElement("h2", {className: "h"}, this.props.texte)
        )
      )
    );
  }
});

module.exports = Footer;

},{}],5:[function(require,module,exports){
var Header= React.createClass({
  displayName : "WebzineHeader",
  logo_url    : "http://agendakar.com/assets/logo-327ec88839272b08eb7b40fe82d636de.png",

  render: function(){
    return(
      React.createElement("div", {id: "webzine-header"}, 
        React.createElement("div", {id: "webzine-logo"}, 
          React.createElement("a", {href: "http://www.agendakar.com", target: "_blank"}, 
            React.createElement("img", {src: this.logo_url, title: "www.agendakar.com", alt: "www.agendakar.com"})
          )
        ), 
        React.createElement("h1", {id: "webzine-txt"}, this.props.titre)
      )
    );
  }
});

module.exports = Header;

},{}],6:[function(require,module,exports){

var Special = React.createClass({displayName: "Special",

  get_url: function(){
    var link = "http://www.agendakar.com/webzine/" + this.props.item.slug;
        link+= "?clientId=" + this.props.clientId;

    return link;
  },

  render: function(){
    var classes = this.props.show ? '' : 'hidden',
        _item   = this.props.item;
    return(
      _item ?
      React.createElement("div", {className: classes, id: "webzine-special"}, 
        React.createElement("div", {id: "s-header"}, 
          React.createElement("div", {id: "date"}
          ), 
          React.createElement("div", {id: "close"}, 
            React.createElement("i", {className: "fa fa-remove", onClick: this.props.onClose})
          )
        ), 
        React.createElement("div", {id: "content"}, 
          React.createElement("div", {className: "titre"}, " ", _item.titre, " "), 
          React.createElement("div", {id: "image"}, 
            React.createElement("img", {src: _item.photo_url, alt: _item.titre, title: _item.titre}), 
            React.createElement("br", null), 
            React.createElement("table", null, 
              React.createElement("tr", null, 
                React.createElement("td", null, 
                'publi' + String.fromCharCode(233) + ' le ', 
                _item.date_de_publication), 
                React.createElement("td", {className: "heure"}, "par ", _item.auteur)
              )
            )
          ), 
          React.createElement("div", {id: "extra"}, 
            React.createElement("a", {href: this.get_url(), target: "_blank"}, 
              React.createElement("i", {className: "fa fa-external-link"}), 
              "lire sur www.agenakar.com"
            )
          )
        )
      )
      : null
    );
  }
});

module.exports = Special;

},{}],7:[function(require,module,exports){
var Header   = require('./header');
var Articles = require('./articles');
var Special  = require('./special');
var Footer   = require('./footer');

var WebzineWidget = React.createClass({displayName: "WebzineWidget",
  getInitialState: function(){
    return({
      isLoading: false,
      articles : [],
      show     : false,
      item     : null,
      url      : 'http://www.agendakar.com/api/v1/articles.json'
    });
  },

  onArticleClick: function(index){
    this.setState({
      show : true,
      item : this.state.articles[index]
    });
  },

  fetchData: function(){
    return $.getJSON(this.state.url);
  },

  withData: function(data){
    this.setState({
      articles  : data,
      isLoading : false
    });
  },

  componentDidMount: function(){
    this.setState({ isLoading : true });
    this.fetchData()
      .then(this.withData)
      .fail(function(){ console.log("erreur"); })
  },

  onSpecialClose: function(){
    this.setState({ item : null, show: false });
  },

  render: function(){
    var toShow = {
      textAlign : 'center',
      display   : this.state.isLoading ? 'block' : 'none'
    };

    return(
      React.createElement("div", {id: "webzine-widget"}, 
        React.createElement(Header, {titre: "Dans le Webzine"}), 
        React.createElement("h2", {style: toShow}, "Chargement en cours ..."), 

        React.createElement(Special, {item: this.state.item, 
                 show: this.state.show, 
                 clientId: this.props.clientId, 
                 onClose: this.onSpecialClose}), 

         this.state.show ?
          null :
          React.createElement(Articles, {liste: this.state.articles, 
                    onArticleClick: this.onArticleClick}), 
        

        React.createElement(Footer, {texte: "Voir tous les articles"})
      )
    );
  }
});

module.exports = WebzineWidget;

},{"./articles":3,"./footer":4,"./header":5,"./special":6}]},{},[1]);
