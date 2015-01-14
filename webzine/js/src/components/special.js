
var Special = React.createClass({

  get_url: function(){
    var link = "http://www.agendakar.com/webzine/" + this.props.item.slug;
        link+= "?clientId=" + this.props.clientId;

    return link;
  },

  render: function(){
    var classes = this.props.show ? '' : 'hidden',
        _item   = this.props.item;
    return(
      _item ?
      <div className={classes} id='webzine-special'>
        <div id='s-header'>
          <div id='date'>
          </div>
          <div id='close'>
            <i className='fa fa-remove' onClick={this.props.onClose}></i>
          </div>
        </div>
        <div id='content'>
          <div className="titre"> {_item.titre} </div>
          <div id='image'>
            <img src={_item.photo_url} alt={_item.titre} title={_item.titre} />
            <br />
            <table>
              <tr>
                <td>
                {'publi' + String.fromCharCode(233) + ' le '}
                {_item.date_de_publication}</td>
                <td className='heure'>par {_item.auteur}</td>
              </tr>
            </table>
          </div>
          <div id='extra'>
            <a href={this.get_url()} target='_blank'>
              <i className='fa fa-external-link'></i>
              lire sur www.agenakar.com
            </a>
          </div>
        </div>
      </div>
      : null
    );
  }
});

module.exports = Special;
