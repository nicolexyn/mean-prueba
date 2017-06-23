'use strict';

describe('Component: filters', function() {
  // load the component's module
  beforeEach(module('appApp.filters'));

  var filtersComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    filtersComponent = $componentController('filters', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
