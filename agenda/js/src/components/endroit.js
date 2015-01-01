var React = require('react');

var Endroit = React.createClass({
  render: function(){
    var s = { margin : '2px 0', color : '#bd1d2b' },
        p = { margin : '0', padding : '0' };
    return(
      <p style={p}>
        <i className='fa fa-map-marker' style={s}></i> { this.props.nom }
      </p>
    )
  }
});

module.exports = Endroit;
