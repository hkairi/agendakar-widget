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

  render: function(){
    var _style = {
      margin   : '0px',
      padding  : '0px',
      fontSize : '12px',
      width    : '100%'
    },
    a = {
      margin  : '0px',
      padding :'0px'
    };

    return(
      <li>
        <div>
        <table style={_style}>
          <tr>
            <td>Le {this.props.date}</td>
            <td>{this.props.heure}</td>
          </tr>
          <tr><td colSpan='2'><a href='#' style={a}> {this.props.nom} </a></td></tr>
        </table>
        </div>
      </li>
    );
  }
});

var Liste = React.createClass({
  displayName: 'Agenda',

  render: function(){
    var l = {
      height: '230px',
      overflow: 'auto'
    },
    liste = [];

    this.props.evenements.map(function(e){
      liste.push(<Evenement nom={e.nom} date={e.date_de_debut} heure={e.heure_de_debut}/>)
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
      fontSize: '16px;',
      textAlign: 'center;',
      height: '20px;',
      fontFamily: "'Dosis', sans-serif;",
      fontweight: '100;',
      textTransform: 'uppercase;',
      background: '#a3abac;',
      color: '#fff ;',
      margin: '0px !important;',
      padding: '5px 0px;',
      textDecoration: 'none;'
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
      evenements: [],
      isLoading: true,
      url: 'http://www.agendakar.com/api/events.json'
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
      width: '300px',
      height: '330px',
      float: 'right'
    },
    toShow = {
      textAlign: 'center',
      display: this.state.isLoading ? 'block' : 'none'
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
