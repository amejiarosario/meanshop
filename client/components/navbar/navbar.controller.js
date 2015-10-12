'use strict';

angular.module('meanshopApp')
  .controller('NavbarCtrl', function ($scope, Auth, $rootScope, $state) {
    $scope.menu = [{
      'title': 'Home',
      'state': 'main'
    }, {
      'title': 'Products',
      'state': 'products'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.search = function () {
      $rootScope.$broadcast('search:term', $scope.searchTerm);
    }
  });
