'use strict';

var errorHandler, uploadHander;

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

  .controller('ProductEditCtrl', function ($scope, $state, $stateParams, Product, Upload, $timeout) {
    $scope.product = Product.get({id: $stateParams.id});
    $scope.editProduct = function(){
      Product.update({id: $scope.product._id}, $scope.product, function success(value /*, responseHeaders*/){
        $state.go('viewProduct', {id: value._id});
      }, errorHandler($scope));
    };

    $scope.upload = uploadHander($scope, Upload, $timeout);
  });

errorHandler = function ($scope){
  return function error(httpResponse){
    $scope.errors = httpResponse;
  };
};

uploadHander = function ($scope, Upload, $timeout) {
  return function(file) {
    if (file && !file.$error) {
      $scope.file = file;
      file.upload = Upload.upload({
        url: '/api/products/'+$scope.product._id+'/upload',
        file: file
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0){
          console.log(response.status + ': ' + response.data);
          errorHandler($scope)(response.status + ': ' + response.data);
        }
      });

      file.upload.progress(function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }
  };
};
