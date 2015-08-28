'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('meanshopApp'));

  var MainCtrl;
  var $scope;
  var state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $state) {
    $scope = $rootScope.$new();
    state = $state;
    MainCtrl = $controller('MainCtrl', {
      $scope: $scope
    });
  }));

  it('should attach a list of products to the scope', function() {
    expect($scope.products.length).to.equal(2);
  });
});
