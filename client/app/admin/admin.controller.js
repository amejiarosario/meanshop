'use strict';

angular.module('meanshopApp')
  .controller('AdminCtrl', function($scope, $http, Auth, User, Product, $state) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.deleteUser = function(user) {
      User.remove({ id: user._id });
      $scope.users.splice(this.$index, 1);
    };

    $scope.products = Product.query();

    $scope.showProduct = function(product){
      $state.go('viewProduct', {id: product._id});
    };

    $scope.editProduct = function(product){
      $state.go('editProduct', {id: product._id});
    };

    $scope.deleteProduct = function(product){
      Product.remove({ id: product._id });
      $scope.products.splice(this.$index, 1);
    };
  });
