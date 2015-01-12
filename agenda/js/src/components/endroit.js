var Endroit = React.createClass({
  render: function(){
    return(
      <p className='endroit'>
        <i className='fa fa-map-marker'></i> { this.props.nom }
      </p>
    )
  }
});

module.exports = Endroit;
