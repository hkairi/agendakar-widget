'use strict';

var React, $, alert, $;

var Evenement = React.createClass({
  displayName: 'Evenement',

  getInitialState: function(){
    return { detail: false };
  },

  get_link: function(id){ return "#http://www.agendakar.com/agenda/"+id+"?utm_source=widget"; },

  handleClick: function(e){
    e.preventDefault();
    this.setState({ detail: ! this.state.detail });
  },

  render: function(){
    var _event = this.props.event,
        _style = { height: this.state.detail ? "120px" : "auto" };

    return(
      React.createElement("li", { style: _style },
        React.createElement("a", { href: this.get_link(_event.id), target: "_blank", onClick: this.handleClick },
          "Le "+ _event.date_de_debut +" a partir de "+ _event.heure_de_debut+" ", React.createElement("br"), React.createElement("b", null, _event.nom)
        )
      )
    );
  }
});

var EventList = React.createClass({
  displayName: 'Agenda',

  render: function(){
    var liste_evenements = [];

    this.props.liste.map(function(e){
      liste_evenements.push(
        React.createElement(Evenement, {event: e, key: e.id})
      );
    });
    return(
      React.createElement("ul", {className: "listing"}, liste_evenements)
    );
  }
});

var Header = React.createClass({displayName: "Header", render: function(){ return React.createElement("h1", null,  this.props.value); } });
var Footer = React.createClass({displayName: "Footer", render: function(){ return React.createElement("p", null,  'www.agendakar.com'); } });

var AgendakarWidget = React.createClass({
  displayName: 'Agendakar',

  getInitialState: function(){
    return {
      events: [],
      didFetchData: false,
      api_url: 'http://www.agendakar.com/api/events.json'
    };
  },

  componentDidMount: function(){
    var self = this;
    $.ajax({ url: this.state.api_url, dataType: 'json', crossDomain: true })
    .done(function(data){ self.setState({ didFetchData: true, events: data }); })
    .fail(function(){ alert("oups"); });
  },

  render: function(){
    var style = {
      margin: '150px 40px;',
      display: this.state.didFetchData ? "none" : "block"
    };

    return(
      React.createElement("div", {className: "agendakar-widget"},
        React.createElement(Header, {value: "Cette semaine sur Agendakar.com"}),
        React.createElement("div", {style: style}, "CHARGEMENT EN COURS..."),
        React.createElement(EventList, {liste: this.state.events}),
        React.createElement(Footer, null)
      )
    );
  }
});
