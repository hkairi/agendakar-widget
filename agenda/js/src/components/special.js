var Special = React.createClass({

  get_url: function(){
    var link = "http://www.agendakar.com/agenda/" + this.props.item.slug;
        link+= "?clientId=" + this.props.clientId;

    return link;
  },

  render: function(){
    var classes = this.props.show ? '' : 'hidden',
        _item   = this.props.item;
    return(
      _item ?
      <div className={classes} id='agd-special'>
        <div id='s-header'>
          <div id='date'>
          </div>
          <div id='close'>
            <i className='fa fa-remove' onClick={this.props.onClose}></i>
          </div>
        </div>
        <div id='content'>
          <div className="titre"> {_item.nom} </div>
          <div id='image'>
            <img src={_item.photo_url} alt={_item.nom} title={_item.nom} />
            <br />
            <table>
              <tr>
                <td>{_item.date}</td>
                <td className='heure'>{_item.heure}</td>
              </tr>
              <tr>
                <td colSpan='2'>{_item.endroit}</td>
              </tr>
            </table>
          </div>
          <div id='extra'>
            <a href={this.get_url()} target='_blank'>
              <i className='fa fa-external-link'></i>
              plus d'infos sur www.agendakar.com
            </a>
          </div>
        </div>
      </div>
      : null
    );
  }
});

module.exports = Special;
