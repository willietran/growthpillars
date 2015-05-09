/**
 * @jsx
 */

var React = require('react');

var NavBar = React.createClass({
  render: function() {
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
          {this.props.children}
        </div>
      </nav>
    );
  },
});

module.exports = NavBar;
