var Endroit = require('./endroit');

var Evenement = React.createClass({
  displayName : "Evenement",
  iscollapsed : null,

  get_url: function(slug){
    var id = this.props.clientId;
    return 'http://www.agendakar.com/agenda/' + slug + '?clientId=' + id;
  },

  getInitialState: function(){ return { iscollapsed: true }; },

  clickHandler: function(e){
    this.props.onClick(this.props.index);
    e.preventDefault();
  },

  render: function(){
    var classes = this.state.iscollapsed ? 'lieu hidden' : 'lieu' ,
    _event = this.props.event;

    return(
      <li className='item' onClick={this.clickHandler}>
        <div>
          <table className='evenement'>
            <tr>
            <td>
              <div className='dateheure'>
                <div className='date'>Le {_event.date}</div>
                <div className='heure'>{_event.heure}</div>
              </div>
              </td>
            </tr>
            <tr>
              <td>{_event.nom}</td>
           </tr>
           </table>
        </div>
      </li>
    );
  }
});

module.exports = Evenement;
