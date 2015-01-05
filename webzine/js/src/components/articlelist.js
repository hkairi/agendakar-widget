var React   = require('react');
var Article = require('./article');

var ArticleList = React.createClass({

  showArticles: function(){
    return(
      this.props.liste.map(function(art){
        return(<Article article={art} />);
      })
    );
  },

  render: function(){
    return(
      <div className='articles'>
      liste des articles
      <br />
      {this.showArticles()}
      </div>
    );
  }
});

module.exports = ArticleList;
