/**
 * @jsx
 */

var React = require('react');

var LoggedOutNavItem = React.createClass({
  render: function() {
    return (
      <div className="collapse navbar-collapse" id="navbar">
        <ul className="nav navbar-nav navbar-right">
          <li><a href="/auth/twitter" className="register">{'Sign Up'}</a></li>
          <li><a href="/auth/twitter" className="login">{'Twitter Login'}</a></li>
        </ul>
      </div>
    );
  }
});

module.exports = LoggedOutNavItem;
