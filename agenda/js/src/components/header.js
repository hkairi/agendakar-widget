var Header= React.createClass({
  displayName : "Header",
  logo_url    : "http://agendakar.com/assets/logo-327ec88839272b08eb7b40fe82d636de.png",

  render: function(){
    return(
      <div id='agd-header'>
        <div id='agd-logo'>
          <a href='http://www.agendakar.com' target='_blank'>
            <img src={this.logo_url} title='www.agendakar.com' alt='www.agendakar.com'/>
          </a>
        </div>
        <h1 id='agd-txt'>{this.props.titre}</h1>
      </div>
    );
  }
});

module.exports = Header;
