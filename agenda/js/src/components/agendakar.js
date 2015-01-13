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
      <div id='agd-widget'>
        <Header titre="cette semaine a Dakar"/>
        <h2 style={toShow}>Chargement en cours ...</h2>

        <Special item     = {this.state.item}
                 show     = {this.state.show}
                 clientId = {this.props.clientId}
                 onClose  = {this.onSpecialClose}/>

        { this.state.show ? null :
        <Liste evenements       = {this.state.evenements}
               onEvenementClick = {this.onEvenementClick}/>
        }
        <Footer />
      </div>
    );
  }
});

module.exports = AgendakarWidget;
