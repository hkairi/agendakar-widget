var Footer= React.createClass({
  render: function(){
    var footer_style = { borderTop: '1px solid #DDD' },
        a = { textDecoration: 'none' },
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
        <a href="http://www.agendakar.com" target="_blank" style={a}>
          <h2 style={h2}>aller sur agendakar</h2>
        </a>
      </div>
    );
  }
});

module.exports = Footer;
