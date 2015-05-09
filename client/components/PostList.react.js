/**
 * @jsx
 */

var React = require('react');

var PostList = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="page-header">
          <time className="date" dateTime="2014-11-25">
            <h4 className="day-name"></h4>
            <h4 className="day-name">{'TODAY'}</h4>
          </time>
        </div>
        {this.props.children}
      </div>
    );
  },
});

module.exports = PostList
