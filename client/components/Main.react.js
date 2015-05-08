/**
 * @jsx
 */

var React = require('react');

var NavBar = require('./NavBar.react');
var PostList = require('./PostList.react');

var Main = React.createClass({
  propTypes: {
    posts: React.PropTypes.array,
    user: React.PropTypes.object,
  },

  render: function() {
    return (
      <div>
        <NavBar user={this.props.user} />
        <PostList posts={this.props.posts} />
      </div>
    );
  }
});

module.exports = Main;
