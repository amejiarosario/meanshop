'use strict';

angular.module('meanshopApp')
  .controller('MainCtrl', function($scope, $http, socket, Product) {
    $scope.products = Product.query();
  });
