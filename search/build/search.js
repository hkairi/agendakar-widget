(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Loader = React.createClass({displayName: "Loader",
  show: function(){
    if (this.props.toShow){
      return(
        React.createElement("div", {id: "loading"}, 
          "Recherche sur AgenDakar en cours ..."
        )
      )
    } else {
      return null;
    }
  },

  render: function(){
    return this.show();
  }
});

module.exports = Loader;

},{}],2:[function(require,module,exports){
var Loader        = require('./loader.jsx');
var SearchBox     = require('./searchBox.jsx');
var SearchResults = require('./searchResults.jsx');

var SearchWidget = React.createClass({displayName: "SearchWidget",

  getInitialState: function(){
    return {
      url         : 'http://agendakar.com/api/v1/search',
      agenda      : [],
      webzine     : [],
      hasResults  : false,
      isSearching : false
    };
  },

  fetchData: function(q){
    return $.ajax({
      url: this.state.url,
      data: { query: q },
      method: 'GET',
      dataType: 'json'
    });
  },

  showResults: function(data){
    var agenda = data.agenda,
        webzine= data.webzine;

    this.setState({
      isSearching : false,
      agenda      : agenda,
      webzine     : webzine,
      hasResults  : true
    });
  },

  onSearchSubmit: function(query){
    this.setState({ isSearching: true, hasResults: true });
    this.fetchData(query)
      .then(this.showResults)
      .fail(function(){
        console.log("erreur...");
      })
  },

  onSearchCancel: function(){
    this.setState({
      isSearching : false,
      hasResults  : false,
      agenda      : [],
      webzine     : []
    });
  },

  render: function(){
    return(
      React.createElement("div", {id: "agd-search-widget"}, 
        React.createElement(SearchBox, {onSubmit: this.onSearchSubmit, 
                   onCancel: this.onSearchCancel, 
                   hasResults: this.state.hasResults}), 

        React.createElement("div", {id: "agd-resultats"}, 
          React.createElement(Loader, {toShow: this.state.isSearching}), 

          React.createElement(SearchResults, {results: this.state.agenda, 
                         resultsFor: "Dans l'Agenda", 
                         classes: "agenda", 
                         toShow: this.state.hasResults}), 

          React.createElement(SearchResults, {results: this.state.webzine, 
                         resultsFor: "Dans le Webzine", 
                         classes: "webzine", 
                         toShow: this.state.hasResults})
        )
    )
    );
  }
});

module.exports = SearchWidget;

},{"./loader.jsx":1,"./searchBox.jsx":3,"./searchResults.jsx":5}],3:[function(require,module,exports){
var SearchButton = require('./searchButton.jsx');

var SearchBox = React.createClass({displayName: "SearchBox",

  onSubmit: function(){
    var el      = this.refs.query.getDOMNode();
    el.disabled = true;
    this.props.onSubmit(el.value);
  },

  onCancel: function(){
    var el      = this.refs.query.getDOMNode();
    el.disabled = false;
    el.value    = '';
    el.focus();
    this.props.onCancel();
  },

  render: function(){
    return(
      React.createElement("div", {id: "agd-search"}, 
        React.createElement("input", {type: "text", 
               ref: "query", 
               id: "agd-searchfield", 
               placeholder: "Recherchez sur Agendakar.com"}), 

        React.createElement(SearchButton, {searching: this.props.hasResults, 
                      oncancel: this.onCancel, 
                      onsubmit: this.onSubmit})
      )
    );
  }
});

module.exports = SearchBox;

},{"./searchButton.jsx":4}],4:[function(require,module,exports){
var SearchButton = React.createClass({
  displayName: 'SearchButton',

  clickHandler: function(){
    if (this.props.searching){
      this.props.oncancel();
    }
    else{
      this.props.onsubmit();
    }
  },
  render: function(){
    var classes = this.props.searching ? 'fa fa-remove' : 'fa fa-search' ;

    return(
      React.createElement("button", {onClick: this.clickHandler}, React.createElement("i", {className: classes}))
    );
  }
});

module.exports = SearchButton;

},{}],5:[function(require,module,exports){
var SearchResults = React.createClass({displayName: "SearchResults",
  result_items: function(){
    if(this.props.toShow){
      var css      = this.props.classes,
          txt      = this.props.resultsFor,
          items    = [],
          _results = this.props.results;

          if( _results.length === 0 ){
            items.push(
              React.createElement("li", {className: "result-item empty"}, 
                React.createElement("b", null,  'aucun r' + String.fromCharCode(233)+ 'sultat')
              )
            )
          }
          else{
            _results.map(function(_e){
              items.push( React.createElement("li", {className: "result-item"}, _e.nom))
            });
          }

      return(
      React.createElement("div", {className: "results"}, 
        React.createElement("header", {className: css}, " ", txt, " "), 
        React.createElement("ul", null, 
          items
        )
      )
      );
    }
    else{
      return null;
    }
  },

  render: function(){
    return this.result_items() ;
  }
});

module.exports = SearchResults;

},{}],6:[function(require,module,exports){
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
  load_police("src/css/search.css");
  load_police("http://fonts.googleapis.com/css?family=Dosis");
  load_police("http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css");
}

function start(){
  var SearchWidget = require('./components/search.jsx');
  var e   = document.getElementById('agendakar-search');
  var d   = e.attributes['data-el'].value;
  var _id = e.attributes['data-cid'].value;

  React.render(
    React.createElement(SearchWidget, {clientId: _id}), document.getElementById(d)
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

},{"./components/search.jsx":2}]},{},[6]);
