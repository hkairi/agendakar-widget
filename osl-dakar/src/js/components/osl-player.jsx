var React    = require('react');
var PlayList = require('./playlist.jsx');
var Player   = require('./player.jsx');

var OslPlayer = React.createClass({
  getInitialState: function(){
    return {
      currentTrack : { path: "f.mp3", title: "iqra al khabar"},
      tracks : [
        { path: "f.mp3", title: "When i'm gone" },
        { path:'f.mp3',  title: "Mosh"},
        { path:'f.mp3',  title: "Veer zara"}
      ]
    };
  },

  onClick: function(item){
    console.log(item, 'ici');
  },

  render: function(){
    return(
      <div id='osl-player'>
        <Player track={this.state.currentTrack} />
        <hr />
        <PlayList songs={this.state.tracks} onItemClick={this.onClick}/>
      </div>
    );
  }
});

module.exports = OslPlayer;
