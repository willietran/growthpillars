/**
 * @jsx
 */

var React = require('react');
var nunjucks = require('nunjucks');

var Main = React.createClass({
  propTypes: {
    posts: React.PropTypes.array,
    user: React.PropTypes.object,
  },

  render: function() {
    var bodyMarkup = nunjucks.render(
      'server/templates/views/base.html',
      { posts: this.props.posts, user: this.props.user }
    );
    var innerHTML = { __html: bodyMarkup };
    return (
      <html>
        <head lang="en">
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Growth Pillars</title>
          <link rel="stylesheet" href="styles/app.css"/>
        </head>
        <body
          dangerouslySetInnerHTML={innerHTML}
        />
      </html>
    );
  }
});

module.exports = Main;
