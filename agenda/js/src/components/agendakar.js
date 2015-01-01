var $     = require('jquery'), alert;
var React = require('react');

var Header = require('./header');
var Liste  = require('./liste');
var Footer = require('./footer');

var AgendakarWidget= React.createClass({
  displayName: 'agendakar-widget',
  evenements : [],
  isLoading  : true,
  url        : 'http://www.agendakar.com/api/events.json',

  getInitialState: function(){
    return {
      evenements : [],
      isLoading  : true,
      url        : 'http://www.agendakar.com/api/events.json'
    };
  },

  componentDidMount: function(){
    var self = this;
    $.get(this.state.url)
    .done(function(data){
      self.setState({
        isLoading  : false,
        evenements : data
      });
    })
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
      <div style={styles}>
        <Header titre="L'agenda cette semaine"/>
        <h2 style={toShow}>Chargement en cours ...</h2>
        <Liste evenements={this.state.evenements}/>
        <Footer />
      </div>
    );
  }
});

module.exports = AgendakarWidget;
