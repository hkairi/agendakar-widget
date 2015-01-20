var Notification = require('./notification.jsx'),
    React        = require('react');

var App = React.createClass({

  getInitialState: function(){
    return {
      wifi : true,
      bell : false
    };
  },

  onClick: function(el){
    if( 'fa-bell' === el ){
      var _ex_etat = this.state.bell;
      this.setState({ bell : ! _ex_etat });
    }
  },

  render: function(){
    return(
      <div>
        <Notification etat = {true}  on = 'fa-bell'      off = 'fa-bell-slash'/>
        <Notification etat = {false} on = 'fa-toggle-on' off = 'fa-toggle-off'/>
        <Notification etat = {false} on = 'fa-thumbs-up' off = 'fa-thumbs-down'/>
        <Notification etat = {true}  on = 'fa-check-square-o' off = 'fa-square-o'/>
      </div>
    );
  }
});

module.exports = App;
