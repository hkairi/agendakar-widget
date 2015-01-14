var Article = require('./article');

var Articles = React.createClass({
  displayName: 'Webzine',

  onClick: function(index){
    this.props.onArticleClick(index);
  },

  getInitialState: function(){
    return {
      selected: false,
      show    : false,
      item    : null
    };
  },

  render: function(){
    var liste = [];
    var _arts = this.props.liste;

    _arts.map(function(d){
      var _i =  _arts.indexOf(d);
      liste.push(
        <Article key     = {d.slug}
                 art     = {d}
                 index   = {_i}
                 clientId= {this.props.clientId}
                 onClick = {this.onClick}/>
      )
    }.bind(this));

    return(
      <div id='webzine-liste'>
        {liste}
      </div>
    );
  }
});

module.exports = Articles;
