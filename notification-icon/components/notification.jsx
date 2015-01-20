var React = require('react');

var Icone = React.createClass({

  propTypes: {
    etat : React.PropTypes.bool.isRequired,
    on   : React.PropTypes.string.isRequired,
    off  : React.PropTypes.string.isRequired
  },

  getInitialState: function(){
    return {
      etat : null
    };
  },

  componentDidMount: function(){
    var _etat = this.props.etat;
    this.setState({ etat : _etat });
  },

  clickHandler: function(e){
    e.preventDefault();
    this.toggleState();
  },

  toggleState: function(){
    this.setState({
      etat : ! this.state.etat
    });
  },

  render: function(){
    var css = 'notification ';
        css+= this.state.etat ? 'on' : 'off';

    var _on  = this.props.on,
        _off = this.props.off,
        _fa  = this.state.etat ? _on : _off;

    var _type = 'fa ' + _fa;

    return(
      <div className={css} title={this.props.type} onClick={this.clickHandler}>
        <i className={_type}></i>
      </div>
    );
  }
});

module.exports = Icone;
