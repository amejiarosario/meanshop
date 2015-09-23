/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Product = require('../api/product/product.model');

User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });

Product.find({}).removeAsync()
  .then(function() {
    Product.createAsync({
      title: 'MEAN eCommerce Book',
      imageUrl: '/assets/uploads/meanbook.jpg',
      price: 25,
      stock: 250,
      description: 'Build a powerful e-commerce application quickly with MEAN, a leading full-JavaScript stack. It takes you step-by-step from creating a real-world store to managing details such as authentication, shopping carts, payment, scalability and more.'
    }, {
      title: 'tshirt',
      imageUrl: '/assets/uploads/meantshirt.jpg',
      price: 15,
      stock: 100,
      description: 'tshirt with the MEAN logo'
    }, {
      title: 'coffee mug',
      imageUrl: '/assets/uploads/meanmug.jpg',
      price: 8,
      stock: 50,
      description: 'Convert coffee into MEAN code'
    })
    .then(function() {
      console.log('finished populating products');
    });
  });
