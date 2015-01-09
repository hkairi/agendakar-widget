var Header= React.createClass({
  displayName : "Header",
  logo_url    : "http://agendakar.com/assets/logo-327ec88839272b08eb7b40fe82d636de.png",

  render: function(){
    var h = {
      fontSize       : '10px !important;',
      height         : '65px !important;',
      lineHeight     : '65px !important;',
      fontWeight     : '100;',
      textTransform  : 'uppercase;',
      background     : '#396eb5 !important;',
      color          : '#fff !important;',
      margin         : '0px !important;'
    };
    var style = {
      width        : '60px !important;',
      height       : '60px !important;',
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
      <div style={h}>
        <div style={style}>
          <a href='http://www.agendakar.com' target='_blank'>
            <img src={this.logo_url} style={img_style}/>
          </a>
        </div>
        <h1>{this.props.titre}</h1>
      </div>
    );
  }
});

module.exports = Header;
