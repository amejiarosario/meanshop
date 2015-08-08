'use strict';

angular.module('meanshopApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('products', {
        url: '/products',
        templateUrl: 'app/products/templates/product-list.html',
        controller: 'ProductsCtrl'
      })

      .state('viewProduct', {
        url: '/products/:id/view',
        templateUrl: 'app/products/templates/product-view.html',
        controller: 'ProductViewCtrl'
      })

      .state('newProduct', {
        url: '/products/new',
        templateUrl: 'app/products/templates/product-new.html',
        controller: 'ProductNewCtrl'
      })

      .state('editProduct', {
        url: '/products/:id/edit',
        templateUrl: 'app/products/templates/product-edit.html',
        controller: 'ProductEditCtrl'
      });
  });

