var SearchResults = React.createClass({
  result_items: function(){
    if(this.props.toShow){
      var css      = this.props.classes,
          txt      = this.props.resultsFor,
          items    = [],
          _results = this.props.results;

          if( _results.length === 0 ){
            items.push(
              <li className='result-item empty'>
                <b>{ 'aucun r' + String.fromCharCode(233)+ 'sultat' }</b>
              </li>
            )
          }
          else{
            _results.map(function(_e){
              items.push( <li className='result-item'>{_e.nom}</li>)
            });
          }

      return(
      <div className='results'>
        <header className={css}> {txt} </header>
        <ul>
          {items}
        </ul>
      </div>
      );
    }
    else{
      return null;
    }
  },

  render: function(){
    return this.result_items() ;
  }
});

module.exports = SearchResults;
