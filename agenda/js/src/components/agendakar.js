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
      url        : 'http://www.agendakar.com/api/v1/events.json'
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
      maxHeight     : '330px',
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
