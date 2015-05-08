/**
 * @jsx
 */

var React = require('react');

var SubmitButton = require('./SubmitButton.react');

var NavBar = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
  },

  render: function() {
    var user = null;
    if (this.props.user) {
      user = (
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-expanded="false" >
                <img className="nav-user-img" src={ this.props.user.image_url }/>
                <span className="caret"/>
              </a>
              <ul className="dropdown-menu" role="menu">
                <li><a href="#">{'View Profile'}</a></li>
                <li><a href="/auth/logout">{'Sign Out'}</a></li>
              </ul>
            </li>
            <li>
              <SubmitButton/>
            </li>
          </ul>
        </div>
      );
    } else {
      user = (
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/auth/twitter" className="register">{'Sign Up'}</a></li>
            <li><a href="/auth/twitter" className="login">{'Twitter Login'}</a></li>
          </ul>
        </div>
      );
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
          {user}
        </div>
      </nav>
    );
  },
});

module.exports = NavBar;
