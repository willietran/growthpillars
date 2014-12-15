var React = require('react');
var ReactSubmitButton = require('../components/SubmitButton.react');

document.addEventListener("DOMContentLoaded", function(event) {
  // Render submit button react element, only if place holder was rendered from
  // server-side template.
  if (document.getElementById('submit-post')) {
    React.render(
      <ReactSubmitButton/>,
      document.getElementById('submit-post')
    );
  }
});
