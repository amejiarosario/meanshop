/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Product = require('../api/product/product.model');
var Catalog = require('../api/catalog/catalog.model');
var mainCatalog, home, books, clothing;

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
      password: process.env.ADMIN_PASSWORD || 'admin'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });

Catalog
  .find({})
  .remove()
  .then(function () {
    return Catalog.create({ name: 'All'});
  })
  .then(function (catalog) {
    mainCatalog = catalog;
    return mainCatalog.addChild({name: 'Home'});
  })
  .then(function (category) {
    home = category._id;
    return mainCatalog.addChild({name: 'Books'});
  })
  .then(function (category) {
    books = category._id;
    return mainCatalog.addChild({name: 'Clothing'});
  })
  .then(function (category) {
    clothing = category._id;
    return Product.find({}).remove({});
  })
  .then(function() {
    return Product.create({
      title: 'MEAN eCommerce Book',
      imageUrl: '/assets/uploads/meanbook.jpg',
      price: 25,
      stock: 250,
      categories: [books],
      description: 'Build a powerful e-commerce application quickly with MEAN, a leading full-JavaScript stack. It takes you step-by-step from creating a real-world store to managing details such as authentication, shopping carts, payment, scalability and more.'
    }, {
      title: 'T-shirt',
      imageUrl: '/assets/uploads/meantshirt.jpg',
      price: 15,
      stock: 100,
      categories: [clothing],
      description: 'T-shirt with the MEAN stack logo'
    }, {
      title: 'Coffee Mug',
      imageUrl: '/assets/uploads/meanmug.jpg',
      price: 8,
      stock: 50,
      categories: [home],
      description: 'Convert coffee into MEAN code'
    });
  })
  .then(function () {
    console.log('Finished populating Products with categories');
  })
  .then(null, function (err) {
    console.error('Error populating Products & categories: ', err);
  });
