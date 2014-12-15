var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;

var SubmitModal = React.createClass({
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

    return (
      <Modal title="Create Post" onRequestHide={this.props.hideHandler}>
        <div className="modal-body">
          <form role="form">
            {fields}
            <button
              className="btn btn-primary"
              onClick={this._submitPost}
            >
              Post
            </button>
          </form>
        </div>
      </Modal>
    );
  },
  _createField: function(name, input) {
    var id = input.props.id;
    return (
      <div className="form-group">
        <label for={id}>{name}:</label>
        {input}
      </div>
    );
  },
  _submitPost: function() {
    // Do an XHR here
  }
});

module.exports = SubmitModal;
