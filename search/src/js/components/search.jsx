var Loader        = require('./loader.jsx');
var SearchBox     = require('./searchBox.jsx');
var SearchResults = require('./searchResults.jsx');

var SearchWidget = React.createClass({

  getInitialState: function(){
    return {
      url         : 'http://agendakar.com/api/v1/search',
      agenda      : [],
      webzine     : [],
      hasResults  : false,
      isSearching : false
    };
  },

  fetchData: function(q){
    return $.ajax({
      url: this.state.url,
      data: { query: q },
      method: 'GET',
      dataType: 'json'
    });
  },

  showResults: function(data){
    var agenda = data.agenda,
        webzine= data.webzine;

    this.setState({
      isSearching : false,
      agenda      : agenda,
      webzine     : webzine,
      hasResults  : (agenda.length !== 0 || webzine.length !== 0)
    });
  },

  onSearchSubmit: function(query){
    this.setState({ isSearching: true, hasResults: true });
    this.fetchData(query)
      .then(this.showResults)
      .fail(function(){
        console.log("erreur...");
      })
  },

  onSearchCancel: function(){
    this.setState({
      isSearching : false,
      hasResults  : false,
      agenda      : [],
      webzine     : []
    });
  },

  render: function(){
    return(
      <div id='agd-search-widget'>
        <SearchBox onSubmit  = {this.onSearchSubmit}
                   onCancel  = {this.onSearchCancel}
                   hasResults= {this.state.hasResults} />

        <div id='agd-resultats'>
          <Loader toShow={this.state.isSearching} />

          <SearchResults results    = {this.state.agenda}
                         resultsFor = "Dans l'Agenda"
                         classes    ='agenda'
                         toShow     = {this.state.hasResults}/>

          <SearchResults results    = {this.state.webzine}
                         resultsFor = "Dans le Webzine"
                         classes    ='webzine'
                         toShow     = {this.state.hasResults}/>
        </div>
    </div>
    );
  }
});

module.exports = SearchWidget;
