var AgendakarWidget = require('./components/agendakar');

var e   = document.getElementById('agendakar-widget');
var d   = e.attributes['data-el'].value;
var _id = e.attributes['data-cid'].value;
var c   = e.attributes['data-cats'].value.split(",");

React.render(
  <AgendakarWidget clientId={_id} categories={c}/>, document.getElementById(d)
);
