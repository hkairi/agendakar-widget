var SearchButton = require('./searchButton.jsx');

var SearchBox = React.createClass({

  onSubmit: function(){
    var el      = this.refs.query.getDOMNode();
    el.disabled = true;
    this.props.onSubmit(el.value);
  },

  onCancel: function(){
    var el      = this.refs.query.getDOMNode();
    el.disabled = false;
    el.value    = '';
    el.focus();
    this.props.onCancel();
  },

  render: function(){
    return(
      <div id='agd-search'>
        <input type='text'
               ref='query'
               id='agd-searchfield'
               placeholder='Recherchez sur Agendakar.com' />

        <SearchButton searching = {this.props.hasResults}
                      oncancel  = {this.onCancel}
                      onsubmit  = {this.onSubmit} />
      </div>
    );
  }
});

module.exports = SearchBox;
