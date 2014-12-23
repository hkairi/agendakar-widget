var React;
var Header= React.createClass({
    displayName: "Header",
    render: function(){
    return( <div><span><img src="http://agendakar.com/assets/logo-327ec88839272b08eb7b40fe82d636de.png" /></span><h1>Agendakar</h1> </div>);
  }
});

var Evenement = React.createClass({
    displayName: "Evenement",
    render: function(){
    return(
      <li>
        <a href='#'> titre </a>
      </li>
    );
  }
});

var Liste= React.createClass({
  render: function(){
    return(
      <div>
        <Evenement />
        <Evenement />
        <Evenement />
        <Evenement />
      </div>
    );
  }
});

var Footer= React.createClass({
  render: function(){
    return( <div> <a href="http://www.agendakar.com" target="_blank"><h2>aller sur agendakar</h2></a></div>);
  }
});

var AgendakarWidget= React.createClass({
  displayName: 'agendakar-widget',

  loadEvent: function(){
    return(
      $.get(this.state.url).then(function(data){ return data; });
    );
  },

  getInitialState: function(){
    return {
      url: 'http://www.agendakar.com/api/events.json',
      isLoading: false
    };
  },

  componentDidMount: function(){
    this.setState({ isLoading: false });
  },

  render: function(){
    var styles = {
      width: '300px',
      height: '300px',
      float: 'right'
    };
    var toShow = {
      display: this.state.isLoading ? "block" : "none"
    };
    return(
      <div style={styles}>
        <Header />
        <h1 style={toShow}>Chargement en cours ...</h1>
        <Liste />
        <Footer />
      </div>
    );
  }
});

React.render(
  <AgendakarWidget />, document.getElementById('content')
);
