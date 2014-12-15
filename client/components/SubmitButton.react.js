var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;
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
          onClick={this._showModal}
        >
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
      <Modal title="Create Post" onRequestHide={this._hideModal}>
        <div className="modal-body">
        </div>
        <div className="modal-body">
          <button onClick={this._hideModal}>Close</button>
        </div>
      </Modal>
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
