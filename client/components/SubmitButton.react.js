var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var ReactSubmitModal = require('./SubmitModal.react');
var OverlayMixin = ReactBootstrap.OverlayMixin;

var SubmitButton = React.createClass({
  mixins: [OverlayMixin],
  getInitialState: function() {
    return {
      shown: false,
    };
  },
  render: function() {
    return (
      <a className="button-link">
        <button
          className="submit-btn"
          onClick={this._showModal} >
          {'Post Your Strategy'}
        </button>
      </a>
    );
  },
  renderOverlay: function() {
    if (!this.state.shown) {
      return <span/>;
    }

    return (
      <ReactSubmitModal
        hideHandler={this._hideModal}
      />
    );
  },
  _showModal: function() {
    this.setState({ shown: true });
  },
  _hideModal: function() {
    this.setState({ shown: false });
  },
});

module.exports = SubmitButton;
