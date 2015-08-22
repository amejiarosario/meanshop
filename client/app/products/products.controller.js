'use strict';

angular.module('meanshopApp')

  .controller('ProductsCtrl', function ($scope, Product) {
    $scope.products = Product.query();
  })

  .controller('ProductViewCtrl', function ($scope, $state, $stateParams, Product) {
    $scope.product = Product.get({id: $stateParams.id});

    $scope.deleteProduct = function(){
      Product.delete($scope.product);
      $state.go('products');
    }
  })

  .controller('ProductNewCtrl', function ($scope, $state, Product) {
    $scope.product = {}; // create a new instance
    $scope.addProduct = function(product){
      Product.create($scope.product);
      $state.go('products');
    }
  })

  .controller('ProductEditCtrl', function ($scope, $state, $stateParams, Product) {
    $scope.product = Product.get({id: $stateParams.id});

    $scope.editProduct = function(product){
      Product.update($scope.product);
      $state.go('products');
    }
  });

