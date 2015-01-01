var React = require('react');
var Endroit = require('./endroit');

var Evenement = React.createClass({
  displayName : "Evenement",
  iscollapsed : null,

  get_url: function(slug){ return 'http://www.agendakar.com/agenda/' + slug; },

  handleClick: function(){ this.setState({ iscollapsed: ! this.state.iscollapsed }); },

  getInitialState: function(){ return { iscollapsed: true }; },

  render: function(){
    var _style = {
      width    : '100%',
      margin   : '0',
      cursor   : 'pointer',
      padding  : '0px',
      fontSize : '12px'
    },
    li_style = {
      color        : '#000',
      listStyle    : 'none',
      margin       : '2px 0px',
      borderBottom : '1px solid #A3ABAC',
      height       : this.state.iscollapsed ? 'auto' : '105px'
    },
    c = { display : this.state.iscollapsed ? 'none' : 'block' },
    d = {
      display : this.state.iscollapsed ? 'none' : 'block',
      margin  : '0px auto',
      width   : '100%'
    },
    e = {
      display : this.state.iscollapsed ? 'none' : 'block',
      margin  : '6px auto 0 auto',
      textAlign: 'center',
      width   : '100%'
    },
    a = {
      color          : '#000',
      margin         : '0px',
      padding        : '0px',
      textDecoration :  'none'
    },
    st = { textAlign: 'right' },
    ac = {
      color          : '#000',
      width          : '100%',
      textAlign      : 'center',
      textDecoration :  'none'
    },
    _event = this.props.event;

    return(
      <li style={li_style} onClick={this.handleClick}>
        <div>
          <table style={_style}>
            <tr>
              <td>Le {_event.date}</td>
              <td style={st}>{_event.heure}</td>
            </tr>
            <tr>
              <td colSpan='2'>
                <a href={this.get_url(_event.slug)} style={a} target='_blank'>
                  {_event.nom}
                </a>
              </td>
           </tr>
           <tr style={d}>
              <td><Endroit nom={_event.endroit} /></td>
              <td style={st}>{_event.quartier}</td>
            </tr>
          </table>
          <div style={e}>
            <a href={this.get_url(_event.slug)} style={ac} target='_blank'>
              <i className='fa fa-external-link'></i>
              plus d'infos sur www.agendakar.com
            </a>
          </div>
        </div>
      </li>
    );
  }
});

module.exports = Evenement;
