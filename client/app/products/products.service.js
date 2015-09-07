'use strict';

angular.module('meanshopApp')
  .factory('Product', function () {
    var lastId = 5;
    var exampleProducts = [
      {_id: 1, title: 'Product 1', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'},
      {_id: 2, title: 'Product 2', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'},
      {_id: 3, title: 'Product 3', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'},
      {_id: 4, title: 'Product 4', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'},
      {_id: 5, title: 'Product 5', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'}
    ];

    return {
      query: function(){
        return exampleProducts;
      },

      get: function(params){
        var result = {};
        angular.forEach(exampleProducts, function (product) {
          if(product._id == params.id){
            this.product = product;
            return;
          }
        }, result);
        return result.product;
      },

      delete: function(params){
        angular.forEach(exampleProducts, function (product, index) {
          if(product._id == params._id){
            console.log(product, index);
            exampleProducts.splice(index, 1);
            return;
          }
        });
      },

      create: function(product){
        product._id = ++lastId;
        exampleProducts.push(product);
      },

      update: function(product){
        var item = this.get(product);
        if(!item) { return false; }

        item.title = product.title;
        item.price = product.price;
        item.quantity = product.quantity;
        item.description = product.description;
        return true;
      }
    };
  });
