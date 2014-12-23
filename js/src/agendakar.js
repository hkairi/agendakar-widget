var React;
var Header= React.createClass({
  render: function(){
    return( <div> <h1>Agendakar</h1> </div>);
  }
});

var Evenement = React.createClass({
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
    return( <div> <h1>Footer</h1> </div>);
  }
});

var AgendakarWidget= React.createClass({
  displayName: 'agendakar-widget',

  render: function(){
    var styles = {
      width: '300px',
      height: '400px',
      border: '1px solid #A3ABAC',
      float: 'right'
    };
    return(
      <div style={styles}>
        <Header />
        <Liste />
        <Footer />
      </div>
    );
  }
});

React.render(
  <AgendakarWidget />, document.getElementById('content')
);
