var Special = React.createClass({
  getDefaultProps: function(){
    return({
      item: {
        nom: ''
      }
    });
  },
  render: function(){
    var classes = this.props.show ? '' : 'hidden';
    return(
      this.props.item ?
      <div className={classes} id='agd-special'>
        <i className='fa fa-remove'></i>
        {this.props.item.nom}
      </div>
      : null
    );
  }
});

module.exports = Special;
