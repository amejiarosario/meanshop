'use strict';

angular.module('meanshopApp')
  .controller('SidebarCtrl', function ($scope, Catalog, $location) {
    $scope.catalog = Catalog.query();

    $scope.isActive = function(route) {
      return $location.path().indexOf(route) > -1;
    };
  });
