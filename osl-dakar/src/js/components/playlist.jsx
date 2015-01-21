var React = require('react');

var PlayList = React.createClass({
  clickHandler: function(){
    console.log('ok');
  },

  add_item: function(item){
    return(
      <li key={item.title} onCick={this.clickHandler}>
        {item.title}
      </li>
    );
  },

  render: function(){
    var liste = this.props.songs.map(this.add_item);
    return(
      <ul>
        {liste}
      </ul>
    );
  }
});

module.exports = PlayList;
