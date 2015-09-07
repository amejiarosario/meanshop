'use strict';

angular.module('meanshopApp')
  .factory('Product', function ($resource) {
    return $resource('/api/products/:id', null, {
      'update': { method: 'PUT'}
    });
  });

