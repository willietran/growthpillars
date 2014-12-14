/** @jsx React.DOM */

var GrowthpillarsApp = require('./GrowthpillarsApp');
var React = require('react');
var {DefaultRoute, Route, Routes} = require('react-router');

React.renderComponent((
  <Routes location="history">
    <Route path="/" handler={GrowthpillarsApp}>
    </Route>
  </Routes>
), document.getElementById('content'));
