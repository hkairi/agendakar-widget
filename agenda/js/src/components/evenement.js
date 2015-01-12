var Endroit = require('./endroit');

var Evenement = React.createClass({
  displayName : "Evenement",
  iscollapsed : null,

  get_url: function(slug){
    var id = this.props.clientId;
    return 'http://www.agendakar.com/agenda/' + slug + '?clientId=' + id;
  },

  getInitialState: function(){ return { iscollapsed: true }; },

  clickHandler: function(){
    this.props.onClick(this.props.index);
  },

  render: function(){
    var classes = this.state.iscollapsed ? 'lieu hidden' : 'lieu' ,
    _event = this.props.event;

    return(
      <li className='item' onClick={this.clickHandler}>
        <div>
          <table className='evenement'>
            <tr>
              <td className='date'>Le {_event.date}</td>
              <td className='heure'>{_event.heure}</td>
            </tr>
            <tr>
              <td colSpan='2'>
                <a href={this.get_url(_event.slug)} target='_blank'>
                  {_event.nom}
                </a>
              </td>
           </tr>
           </table>
        </div>
      </li>
    );
  }
});

module.exports = Evenement;
