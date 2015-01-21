var React = require('react');
var Player = React.createClass({

  render: function(){
    return(
      <div>
        <p>playing : {this.props.track.title}</p>
        <audio controls>
          <source src={this.props.track.path} type="audio/mpeg" />
        </audio>
      </div>
    );
  }
});

module.exports = Player;
