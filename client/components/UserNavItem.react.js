/**
 * @jsx
 */

var React = require('react');

var SubmitButton = require('./SubmitButton.react');

var UserNavItem = React.createClass({
  propTypes: {
    image_url: React.PropTypes.any,
  },

  render: function() {
    return (
      <div className="collapse navbar-collapse" id="navbar">
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a
              href="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-expanded="false" >
              <img className="nav-user-img" src={ this.props.image_url }/>
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
  },
});

module.exports = UserNavItem;
