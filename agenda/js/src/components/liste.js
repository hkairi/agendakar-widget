var Evenement = require('./evenement');

// Liste Component
var Liste = React.createClass({
  displayName: 'Agenda',

  render: function(){
    var l = {
      height   : '230px',
      overflow : 'auto'
    },
    liste = [];

    this.props.evenements.map(function(d){
      liste.push(
        <Evenement key={d.slug} event={d} clientId={this.props.clientId}/>
      )
    }.bind(this));

    return(
      <div style={l}>
        {liste}
      </div>
    );
  }
});

module.exports = Liste;
