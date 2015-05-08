/**
 * @jsx
 */

var React = require('react');
var Main = require('../components/Main.react');

var props =
  JSON.parse(document.getElementById('initial-props').getAttribute('value'));

console.log(props);

React.render(
  <Main {...props} />,
  document.getElementById('contents')
);
