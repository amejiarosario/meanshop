'use strict';

var errorHandler, uploadHander;

angular.module('meanshopApp')

  .controller('ProductsCtrl', function ($scope, Product) {
    $scope.products = Product.query();

    $scope.$on('search:term', function (event, data) {
      if(data.length) {
        $scope.products = Product.search({id: data});
        $scope.query = data;
      } else {
        $scope.products = Product.query();
        $scope.query = '';
      }
    });
  })

  .controller('ProductCatalogCtrl', function ($scope, $stateParams, Product) {
    $scope.products = Product.catalog({id: $stateParams.slug});
    $scope.query = $stateParams.slug;
  })

  .controller('ProductViewCtrl', function ($scope, $state, $stateParams, Product, Auth) {
    $scope.product = Product.get({id: $stateParams.id});
    $scope.user = Auth.getCurrentUser();
    $scope.deleteProduct = function(){
      Product.delete({id: $scope.product._id}, function success(/* value, responseHeaders */) {
        $state.go('products');
      }, errorHandler($scope));
    };
  })

  .controller('ProductNewCtrl', function ($scope, $state, Product) {
    $scope.product = {}; // create a new instance
    $scope.addProduct = function(){
      return Product.save($scope.product).$promise.then(function (product) {
        return Product.upload($scope.product.picture, product._id);
      }).then(function (product) {
        $state.go('viewProduct', {id: product._id});
      }).catch(errorHandler($scope));
    };
  })

  .controller('ProductEditCtrl', function ($scope, $state, $stateParams, Product, Upload, $timeout) {
    $scope.product = Product.get({id: $stateParams.id});
    $scope.editProduct = function(){
      return Product.update({id: $scope.product._id}, $scope.product).$promise.then(function (product) {
        return Product.upload($scope.product.picture, product._id);
      }).then(function (product) {
        $state.go('viewProduct', {id: product._id});
      }).catch(errorHandler($scope));
    };

    $scope.upload = uploadHander($scope, Upload, $timeout);
  })

  .constant('clientTokenPath', '/api/braintree/client_token')

  .controller('ProductCheckoutCtrl',
    function($scope, $http, $state, ngCart){
    $scope.errors = '';

    $scope.paymentOptions = {
      onPaymentMethodReceived: function(payload) {
        angular.merge(payload, ngCart.toObject());
        payload.total = payload.totalCost;
        $http.post('/api/orders', payload)
        .then(function success () {
          ngCart.empty(true);
          $state.go('products');
        }, function error (res) {
          $scope.errors = res;
        });
      }
    };
  });

errorHandler = function ($scope){
  return function error(httpResponse){
    console.log('failed: ', httpResponse);
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
