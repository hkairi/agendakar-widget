var Loader = React.createClass({
  show: function(){
    if (this.props.toShow){
      return(
        <div id='loading'>
          Recherche sur AgenDakar en cours ...
        </div>
      )
    } else {
      return null;
    }
  },

  render: function(){
    return this.show();
  }
});

module.exports = Loader;
