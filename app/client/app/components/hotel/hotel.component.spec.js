'use strict';

describe('Component: hotel', function() {
  // load the component's module
  beforeEach(module('appApp.hotel'));

  var hotelComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    hotelComponent = $componentController('hotel', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
