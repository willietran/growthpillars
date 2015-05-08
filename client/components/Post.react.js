/**
 * @jsx
 */

var React = require('react');

var Post = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    title: React.PropTypes.string,
    place: React.PropTypes.string,
    idea: React.PropTypes.string,
    labor: React.PropTypes.string,
    audience: React.PropTypes.string,
    result: React.PropTypes.string,
    spend: React.PropTypes.string,
    story: React.PropTypes.string,
  },
  render: function() {
    return (
      <div>
        <h1>View Post</h1>
        <h4>Place</h4>
        <p>{ this.props.place }</p>
        <h4>Idea</h4>
        <p>{ this.props.idea }</p>
        <h4>Labor</h4>
        <p>{ this.props.labor + ' hours'}</p>
        <h4>Link</h4>
        <a href={ this.props.link }>Link</a>
        <h4>Audience</h4>
        <p>{ this.props.audience }</p>
        <h4>Results</h4>
        <p>{ this.props.result }</p>
        <h4>Spend</h4>
        <p>{ this.props.spend }</p>
        <h4>Story</h4>
        <p>{ this.props.story }</p>
        <a href={"/vote/" + this.props.id }>Upvote</a>
      </div>
    );
  }
});

module.exports = Post;
