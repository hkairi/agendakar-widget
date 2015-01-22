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
        <Evenement key={d.slug}
                   event={d}
                   index= {_i}
                   clientId={this.props.clientId}
                   onClick={this.onClick}/>
      )
    }.bind(this));

    return(
      <div id='agd-liste'>
        <ul>
          {liste}
        </ul>
      </div>
    );
  }
});

module.exports = Liste;
