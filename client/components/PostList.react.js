/**
 * @jsx
 */

var React = require('react');

var PostItem = require('./PostItem.react');

var PostList = React.createClass({
  propTypes: {
    posts: React.PropTypes.array,
  },

  render: function() {
    return (
      <div className="container">
        <div className="page-header">
          <time className="date" datetime="2014-11-25">
            <h4 className="day-name"></h4>
            <h4 className="day-name">{'TODAY'}</h4>
          </time>
        </div>
        {this._renderPosts()}
      </div>
    );
  },

  _renderPosts: function() {
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

module.exports = PostList
