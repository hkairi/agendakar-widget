var Header   = require('./header');
var Articles = require('./articles');
var Special  = require('./special');
var Footer   = require('./footer');

var WebzineWidget = React.createClass({
  getInitialState: function(){
    return({
      isLoading: false,
      articles : [],
      show     : false,
      item     : null,
      url      : 'http://www.agendakar.com/api/v1/articles.json'
    });
  },

  onArticleClick: function(index){
    this.setState({
      show : true,
      item : this.state.articles[index]
    });
    return false;
  },

  fetchData: function(){
    return $.getJSON(this.state.url);
  },

  withData: function(data){
    this.setState({
      articles  : data,
      isLoading : false
    });
  },

  componentDidMount: function(){
    this.setState({ isLoading : true });
    this.fetchData()
      .then(this.withData)
      .fail(function(){ console.log("erreur"); })
  },

  onSpecialClose: function(){
    this.setState({ item : null, show: false });
    return false;
  },

  render: function(){
    var toShow = {
      textAlign : 'center',
      display   : this.state.isLoading ? 'block' : 'none'
    };

    return(
      <div id='webzine-widget'>
        <Header titre="Dans le Webzine"/>
        <h2 style={toShow}>Chargement en cours ...</h2>

        <Special item     = {this.state.item}
                 show     = {this.state.show}
                 clientId = {this.props.clientId}
                 onClose  = {this.onSpecialClose}/>

        { this.state.show ?
          null :
          <Articles liste          = {this.state.articles}
                    onArticleClick = {this.onArticleClick} />
        }

        <Footer texte="Voir tous les articles"/>
      </div>
    );
  }
});

module.exports = WebzineWidget;
