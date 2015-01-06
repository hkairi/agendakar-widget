var $           = require('jquery');
var React       = require('react');
var Header      = require('./header');
var ArticleList = require('./articlelist');
var Footer      = require('./footer');

var WebzineWidget = React.createClass({
  getInitialState: function(){
    return {
      articles: [],
      data_url: "http://www.agendakar.com/api/v1/articles.json"
    };
  },

  onSuccess: function(data){
    this.setState({ articles: data });
  },

  onError: function(){
    console.log("oups");
  },

  componentDidMount: function(){
    $.getJSON(this.state.data_url, this.onSuccess, this.onError);
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
