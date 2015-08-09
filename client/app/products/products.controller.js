'use strict';

var errorHandler;

angular.module('meanshopApp')
  .controller('ProductsCtrl', function ($scope, Product) {
    $scope.products = Product.query();
  })

  .controller('ProductViewCtrl', function ($scope, $state, $stateParams, Product) {
    $scope.product = Product.get({id: $stateParams.id});
    $scope.deleteProduct = function(){
      Product.delete({id: $scope.product._id}, function success(/* value, responseHeaders */) {
        $state.go('products');
      }, errorHandler($scope));
    };
  })

  .controller('ProductNewCtrl', function ($scope, $state, Product) {
    $scope.product = {}; // create a new instance
    $scope.addProduct = function(){
      Product.save($scope.product, function success(value /*, responseHeaders*/){

        $state.go('viewProduct', {id: value._id});
      }, errorHandler($scope));
    };
  })

  .controller('ProductEditCtrl', function ($scope, $state, $stateParams, Product) {
    $scope.product = Product.get({id: $stateParams.id});
    $scope.editProduct = function(){
      Product.update({id: $scope.product._id}, $scope.product, function success(value /*, responseHeaders*/){
        $state.go('viewProduct', {id: value._id});
      }, errorHandler($scope));
    };
  });

errorHandler = function ($scope){
  return function error(httpResponse){
    // console.error(httpResponse);
    $scope.errors = httpResponse;
  };
};
