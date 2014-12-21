var React;
var Evenement = React.createClass({
  displayName: 'Evenement',

  get_link: function(id){
    return "http://www.agendakar.com/events/" + id;
  },

  render: function(){
    return(
      React.createElement("li", null,
                          React.createElement("a", {href: this.get_link(this.props.event.slug), target: "_blank"},
                                               "[Heure : "+this.props.event.heure_de_debut+"] ", React.createElement("b", null, this.props.event.nom)
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
        React.createElement(Evenement, {event: e})
      );
    });
    return(
      React.createElement("ul", {className: "listing"},
                          liste_evenements
                         )
    );
  }
});

var Header = React.createClass({displayName: "Header",
                               render: function(){
                                 return React.createElement("h1", null,  this.props.value);
                               }
});

var Widget = React.createClass({
  displayName: 'Agendakar',

  getInitialState: function(){
    return {
      events: [],
      didFetchData: false,
      api_url: 'http://localhost:3000/api/events.json'
    };
  },

  componentDidMount: function(){
    var self = this;
    $.ajax({
      url: this.state.api_url,
      dataType: 'json',
      crossDomain: true,
    })
    .done(function(data){
      self.setState({ didFetchData: true, events: data });
    })
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
