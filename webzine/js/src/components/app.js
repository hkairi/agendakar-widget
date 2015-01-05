var React       = require('react');
var Header      = require('./header');
var ArticleList = require('./articlelist');
var Footer      = require('./footer');

var WebzineWidget = React.createClass({
  getInitialState: function(){
    return {
      articles: []
    };
  },
  render: function(){
    return(
      <div className='webzine'>
        <Header />
        <ArticleList liste={this.state.articles} />
        <Footer />
      </div>
    )
  }
});

module.exports = WebzineWidget;
