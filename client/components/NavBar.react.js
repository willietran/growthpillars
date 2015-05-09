/**
 * @jsx
 */

var React = require('react');

var UserNavItem = require('./UserNavItem.react');
var LoggedOutNavItem = require('./LoggedOutNavItem.react');

var NavBar = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
  },

  render: function() {
    var navItem = null;
    if (this.props.user) {
      navItem = <UserNavItem {...this.props.user}/>;
    } else {
      navItem = <LoggedOutNavItem />;
    }
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar" >
              <span className="sr-only">{'Toggle navigation'}</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className="logo">
              <a className="navbar-brand" href="/">{'Growth Pillars'}</a>
              <p className="subheader">{'The best marketing strategies, everyday.'}</p>
            </div>
          </div>
          {navItem}
        </div>
      </nav>
    );
  },
});

module.exports = NavBar;
