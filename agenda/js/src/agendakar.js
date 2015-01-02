var AgendakarWidget = require('./components/agendakar');

var e   = document.getElementById('agendakar-widget');
var d   = e.attributes['el'].value;
var _id = e.attributes['cid'].value;
var c   = e.attributes['cats'].value.split(",");

React.render(
  <AgendakarWidget clientId={_id} categories={c}/>, document.getElementById(d)
);
