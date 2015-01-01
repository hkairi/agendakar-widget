var React = require('react');
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
        <Evenement key={d.slug} event={d}/>
      )
    });

    return(
      <div style={l}>
        {liste}
      </div>
    );
  }
});

module.exports = Liste;
