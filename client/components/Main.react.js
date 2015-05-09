/**
 * @jsx
 */

var React = require('react');

var NavBar = require('./NavBar.react');
var UserNavItem = require('./UserNavItem.react');
var LoggedOutNavItem = require('./LoggedOutNavItem.react');
var PostList = require('./PostList.react');
var PostItem = require('./PostItem.react');

var Main = React.createClass({
  propTypes: {
    posts: React.PropTypes.array,
    user: React.PropTypes.object,
  },

  render: function() {
    var navItem = null;
    if (this.props.user) {
      navItem = <UserNavItem user={this.props.user}/>;
    } else {
      navItem = <LoggedOutNavItem />;
    }
    return (
      <div>
        <NavBar>
          {navItem}
        </NavBar>
        <PostList>
          {this._renderPostItems()}
        </PostList>
      </div>
    );
  },

  _renderPostItems: function() {
    return this.props.posts.map(function(post) {
      return (
        <PostItem
          key={post.id}
          {...post}
        />
      );
    });
  }
});

module.exports = Main;
