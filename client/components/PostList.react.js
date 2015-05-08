/**
 * @jsx
 */

var React = require('react');

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
      var imgAlt = 'no image';
      if (post.user != null && post.user.image_url != null) {
        imgAlt = post.user.image_url;
      }
      return (
        <div className="posts-list">
          <div className="row post-item" id={post.id}>
            <div className="col-xs-10">
              <div className="post-content-container">
                <div className="upvote">
                  <a href="#">
                    <span className="glyphicon glyphicon-chevron-up"></span>
                  </a>
                  <span className="upvote">10</span>
                </div>
                <a className="post-title" href={'/view/' + post.id}>
                  {post.title}
                </a>
                <p className="post-growth">
                  {post.result + 'in' + post.labor + 'hours using' + post.place}
                </p>
              </div>
            </div>
            <div className="col-xs-2">
              <div className="post-user-container">
                <a
                  href="#user-profile-link"
                  title="Replace this with user's profile page">
                  <img
                    className="post-user-image img-circle"
                    src={
                      'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAAC' +
                      'H5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
                    }
                    alt={imgAlt}
                  />
                </a>
                <a href="#">
                  <span
                    className="glyphicon glyphicon-comment"
                    ariaHidden="true">
                    {'10'}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
});

module.exports = PostList
