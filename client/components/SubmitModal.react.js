var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var serialize = require('form-serialize');
var Modal = ReactBootstrap.Modal;
var Glyphicon = ReactBootstrap.Glyphicon;
var Button = ReactBootstrap.Button;

// req states:
// -1: failure
//  0: not started
//  1: in flight
//  2: success
var reqState = {
  'FAILURE': -1,
  'NOT_STARTED': 0,
  'IN_FLIGHT': 1,
  'SUCCESS': 2,
};

var SubmitModal = React.createClass({
  getInitialState: function() {
    return {
      reqState: reqState.NOT_STARTED,
    };
  },
  render: function() {
    var fields = [
      { name: 'Title', limit: 80 },
      { name: 'Place', limit: 15 },
      { name: 'Idea', limit: 140 },
      { name: 'Link', limit: 140, type: 'url' },
      { name: 'Labor', type: 'number', step: 0.01 },
      { name: 'Audience', limit:20 },
      { name: 'Result', limit:20 },
      { name: 'Spend', type: 'number', step: 0.01 },
    ].map(function(fieldObj) {
      var displayName = fieldObj.name;
      var name = displayName.toLowerCase();
      var id = 'id_' + name;
      return this._createField(
        displayName,
        <input
          type={fieldObj.type || 'text'}
          className="form-control"
          id={id}
          name={name}
          placeholder={fieldObj.placeholder || displayName}
          step={fieldObj.step}
        />
      );
    }, this);

    // Story field is special
    fields.push(
      this._createField(
        'Story',
        <textarea
          className="form-control"
          cols="40"
          id="id_story"
          name="story"
          placeholder="Why it worked for you"
          rows="2"
        />
      )
    );

    var buttonHandler = null;
    if (this.state.reqState === reqState.NOT_STARTED) {
      var buttonLabel = 'Post';
      var buttonStyle = 'primary';
      buttonHandler = this._submitPost;
    } else if (this.state.reqState === reqState.IN_FLIGHT) {
      var buttonLabel = 'Posting...';
      var buttonStyle = 'primary';
    } else if (this.state.reqState === reqState.SUCCESS) {
      var buttonLabel = (
        <Glyphicon glyph="ok-circle" />
      );
      var buttonStyle = 'success';
      window.setTimeout(this.props.hideHandler, 1000);
    } else { // if (this.state.reqState === reqState.FAILURE)
      var buttonLabel = (
        <Glyphicon glyph="remove-circle" />
      );
      var buttonStyle = 'danger';
    }
    return (
      <Modal title="Create Post" onRequestHide={this.props.hideHandler}>
        <div className="modal-body">
          <form role="form" ref="form">
            {fields}
            <Button
              disabled={buttonHandler === null}
              bsStyle={buttonStyle}
              onClick={buttonHandler} >
              {buttonLabel}
            </Button>
          </form>
        </div>
      </Modal>
    );
  },
  _createField: (function() {
    var key = 0;
    return function(name, input) {
      var id = input.props.id;
      return (
        <div className="form-group" key={key++}>
          <label htmlFor={id}>{name}:</label>
          {input}
        </div>
      );
    };
  })(),
  _submitPost: function(e) {
    var form = this.refs.form.getDOMNode();
    var data = serialize(form, {hash: true});
    this.setState({reqInFlight: true})
    var reqwest = require('reqwest');
    reqwest({
      url: '/post',
      method: 'post',
      data: data,
      success: function (resp) {
        this.setState({
          reqState: reqState.SUCCESS,
        });
      }.bind(this),
      error: function(err) {
        this.setState({
          reqState: reqState.FAILURE,
        });
      }.bind(this),
    });
    e.stopPropagation();
  },
});

module.exports = SubmitModal;
