/**
 * @jsx
 */

var React = require('react');

var PostItem = React.createClass({
  propTypes: {
    id: React.PropTypes.any,
    title: React.PropTypes.string,
    result: React.PropTypes.string,
    labor: React.PropTypes.string,
    place: React.PropTypes.string,
  },

  render: function() {
    var imgAlt = 'no image';
    if (this.props.user != null && this.props.user.image_url != null) {
      imgAlt = this.props.user.image_url;
    }
    return (
      <div className="posts-list">
        <div className="row post-item" id={this.props.id}>
          <div className="col-xs-10">
            <div className="post-content-container">
              <div className="upvote">
                <a href="#">
                  <span className="glyphicon glyphicon-chevron-up"></span>
                </a>
                <span className="upvote">10</span>
              </div>
              <a className="post-title" href={'/view/' + this.props.id}>
                {this.props.title}
              </a>
              <p className="post-growth">
                {
                  this.props.result + ' in ' + this.props.labor +
                  ' hours using ' + this.props.place
                }
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
  }
});

module.exports = PostItem;
