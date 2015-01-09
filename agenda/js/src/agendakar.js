function loadScript(url, callback) {
  var head    = document.getElementsByTagName('head')[0];
  var script  = document.createElement('script');
  script.type = 'text/javascript';
  script.src  = url;

  script.onreadystatechange = callback;
  script.onload = callback;

  head.appendChild(script);
}

function start(){
  var AgendakarWidget = require('./components/agendakar');
  var e   = document.getElementById('agendakar-widget');
  var d   = e.attributes['data-el'].value;
  var _id = e.attributes['data-cid'].value;
  var c   = e.attributes['data-cats'].value.split(",");

  React.render(
    <AgendakarWidget clientId={_id} categories={c}/>, document.getElementById(d)
  );
}

function load_react(){
  loadScript("https://cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react.min.js", start);
}

loadScript("https://code.jquery.com/jquery-1.11.2.min.js", load_react);
