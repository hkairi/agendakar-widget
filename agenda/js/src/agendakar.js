function loadScript(url, callback) {
  var head    = document.getElementsByTagName('head')[0];
  var script  = document.createElement('script');
  script.type = 'text/javascript';
  script.src  = url;
  script.async= 1;

  script.onreadystatechange = callback;
  script.onload = callback;

  head.appendChild(script);
}

function load_police(url){
  var h = document.getElementsByTagName('head')[0],
      d = document.createElement('link');
  d.type= 'text/css';
  d.rel ='stylesheet';
  d.href= url;
  h.appendChild(d);
}

function loadPolices(){
  load_police("css/main.min.css");
  load_police("http://fonts.googleapis.com/css?family=Dosis");
  load_police("http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css");
}

function start(){
  var AgendakarWidget = require('./components/agendakar');
  var e   = document.getElementById('agendakar-agenda');
  var d   = e.attributes['data-el'].value;
  var _id = e.attributes['data-cid'].value;

  React.render(
    <AgendakarWidget clientId={_id}/>, document.getElementById(d)
  );
}

loadPolices();
function load_react(){
  if( window.React === undefined ){
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react.min.js", start);
  }
}
function loadjQuery(){
  if( window.jQuery === undefined ){
    loadScript("https://code.jquery.com/jquery-1.11.2.min.js", load_react);
  }
  else {
    load_react();
  }
}

loadjQuery();
