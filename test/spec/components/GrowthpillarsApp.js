'use strict';

describe('Main', function () {
  var GrowthpillarsApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    GrowthpillarsApp = require('../../../src/scripts/components/GrowthpillarsApp.jsx');
    component = GrowthpillarsApp();
  });

  it('should create a new instance of GrowthpillarsApp', function () {
    expect(component).toBeDefined();
  });
});
