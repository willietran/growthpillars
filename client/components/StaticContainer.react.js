/**
 * @jsx
 */

var React = require('react');

var NavBar = require('./NavBar.react');
var PostList = require('./PostList.react');

var StaticContainer = React.createClass({
  render: function() {
    return (
      <html>
        <head lang="en">
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Growth Pillars</title>
          <link rel="stylesheet" href="styles/app.css"/>
        </head>
        <body>
          {this.props.children}
          <script src='/js/browser.js' />
        </body>
      </html>
    );
  }
});

module.exports = StaticContainer;

