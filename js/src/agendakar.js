var React;

var Header= React.createClass({
  displayName : "Header",
  logo_url    : "http://agendakar.com/assets/logo-327ec88839272b08eb7b40fe82d636de.png",

  render: function(){
    var style = {
      width        : '60px;',
      height       : '60px;',
      background   : '#fff;',
      borderRadius : '1000px;',
      display      : 'block;',
      float        : 'left;',
      margin       : '2px;'
    };

    var img_style = {
      width  : '50px;',
      margin : '6px;'
    };

    return(
      <div>
        <div style={style}>
          <img src={this.logo_url} style={img_style}/>
        </div>
        <h1>{this.props.titre}</h1>
      </div>
    );
  }
});

var Evenement = React.createClass({
  displayName : "Evenement",
  iscollapsed : null,

  get_url: function(slug){
    return 'http://www.agendakar.com/agenda/' + slug;
  },

  handleClick: function(){
    this.setState({ iscollapsed: ! this.state.iscollapsed });
  },

  getInitialState: function(){
    return {
      iscollapsed: true
    };
  },

  render: function(){
    var _style = {
      width    : '100%',
      padding  : '0px',
      margin   : '0',
      fontSize : '12px'
    },
    li_style = {
      color     : '#000',
      listStyle : 'none',
      margin    : '2px 0px',
      border    : '1px solid #A3ABAC',
      height    : this.state.iscollapsed ? 'auto' : '84px'
    },
    c = {
      display : this.state.iscollapsed ? 'none' : 'block',
    },
    d = {
      display : this.state.iscollapsed ? 'none' : 'block',
      margin  : 0,
      width   : '100%'
    },
    a = {
      margin  : '0px',
      padding : '0px'
    },
    st = {
      textAlign: 'right'
    },
    ac = {
      width     : '100%',
      textAlign : 'center'
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
          <div style={d}>
            <a href={this.get_url(_event.slug)} style={ac} target='_blank'>
              <i className='fa fa-external-link'></i> plus d'infos sur agendakar.com
            </a>
          </div>
        </div>
      </li>
    );
  }
});

var Endroit = React.createClass({
  render: function(){
    var s = { margin : '2px 0', color : '#bd1d2b' },
        p = { margin : '0', padding : '0' };
    return(
      <p style={p}>
        <i className='fa fa-map-marker' style={s}></i> { this.props.nom }
      </p>
    )
  }
});
var Liste = React.createClass({
  displayName: 'Agenda',

  render: function(){
    var l = {
      height   : '230px',
      overflow : 'auto'
    },
    liste = [];

    this.props.evenements.map(function(d){
      liste.push(
        <Evenement key={d.slug} event={d}/>
      )
    });

    return(
      <div style={l}>
        {liste}
      </div>
    );
  }
});

var Footer= React.createClass({
  render: function(){
    var footer_style = {
      borderTop: '1px solid #DDD'
    },
    h2 = {
      fontSize       : '16px;',
      textAlign      : 'center;',
      height         : '20px;',
      fontFamily     : "'Dosis', sans-serif;",
      fontweight     : '100;',
      textTransform  : 'uppercase;',
      background     : '#a3abac;',
      color          : '#fff ;',
      margin         : '0px !important;',
      padding        : '5px 0px;',
      textDecoration : 'none;'
    };

    return(
      <div style={footer_style}>
        <a href="http://www.agendakar.com" target="_blank">
          <h2 style={h2}>aller sur agendakar</h2>
        </a>
      </div>
    );
  }
});

var AgendakarWidget= React.createClass({
  displayName: 'agendakar-widget',
  evenements : [],
  isLoading  : true,
  url        : 'http://www.agendakar.com/api/events.json',

  getInitialState: function(){
    return {
      evenements : [],
      isLoading  : true,
      url        : 'http://www.agendakar.com/api/events.json',
    }
  },

  componentDidMount: function(){
    var self = this;
    $.get(this.state.url)
    .done(function(data){
      self.setState({ isLoading: false, evenements: data });
    })
    .fail(function(){
      alert("oups");
    });
  },

  render: function(){
    var styles = {
      fontFamily : "'Dosis', sans-serif",
      width      : '300px',
      height     : '330px',
      float      : 'right'
    },
    toShow = {
      textAlign : 'center',
      display   : this.state.isLoading ? 'block' : 'none'
    };

    return(
      <div style={styles}>
        <Header titre="L'agenda cette semaine"/>
        <h2 style={toShow}>Chargement en cours ...</h2>
        <Liste evenements={this.state.evenements}/>
        <Footer />
      </div>
    );
  }
});

React.render(
  <AgendakarWidget />, document.getElementById('content')
);
