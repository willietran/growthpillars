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
      <html>
        <head lang="en">
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Growth Pillars</title>
          <link rel="stylesheet" href="styles/app.css"/>
        </head>
        <body>
          <NavBar user={this.props.user} />
          <PostList posts={this.props.posts} />
        </body>
      </html>
    );
  }
});

module.exports = Main;
