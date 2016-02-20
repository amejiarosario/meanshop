'use strict';

angular.module('meanshopApp')
  .factory('Catalog', function ($resource) {
    return $resource('/api/catalogs/:id');
  });
