var Footer= React.createClass({
  render: function(){
    return(
      <div id='webzine-footer'>
        <a href="http://www.agendakar.com/webzine" target="_blank">
          <h2 className='h'>{this.props.texte}</h2>
        </a>
      </div>
    );
  }
});

module.exports = Footer;
