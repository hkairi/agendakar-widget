var SearchButton = React.createClass({
  displayName: 'SearchButton',

  clickHandler: function(){
    if (this.props.searching){
      this.props.oncancel();
    }
    else{
      this.props.onsubmit();
    }
  },
  render: function(){
    var classes = this.props.searching ? 'fa fa-remove' : 'fa fa-search' ;

    return(
      <button onClick={this.clickHandler}><i className={classes}></i></button>
    );
  }
});

module.exports = SearchButton;
