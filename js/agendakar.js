'use strict';

var React, $, alert, $;

var Evenement = React.createClass({
  displayName: 'Evenement',

  get_link: function(id){ return "http://www.agendakar.com/agenda/" + id; },

  render: function(){
    var _event = this.props.event;
    return(
      React.createElement("li", null,
        React.createElement("a", {href: this.get_link(_event.id), target: "_blank"},
          "Le "+ _event.date_de_debut +" a "+ _event.heure_de_debut+" ", React.createElement("br"), React.createElement("b", null, _event.nom)
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
    return(
      React.createElement("div", {className: "agendakar-widget"},
        React.createElement(Header, {value: "Agendakar React Widget"}),
        React.createElement(EventList, {liste: this.state.events})
      )
    );
  }
});
