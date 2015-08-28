'use strict';

var app = require('../../app');
var request = require('supertest');

var newProduct;
var validProductAttributes = {
  title: 'Product1',
  price: 100.00
};

var updateProductAttributes = {
  title: 'Product 1 Updated',
  price: 200.00
}

describe('Product API:', function() {

  describe('GET /api/products', function() {
    var products;

    beforeEach(function(done) {
      request(app)
        .get('/api/products')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          products = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      products.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/products', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/products')
        .send(validProductAttributes)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newProduct = res.body;
          done();
        });
    });

    it('should respond with the newly created product', function() {
      for(var attribute in validProductAttributes){
        newProduct[attribute].should.equal(validProductAttributes[attribute]);
      }
    });

  });

  describe('GET /api/products/:id', function() {
    var product;

    beforeEach(function(done) {
      request(app)
        .get('/api/products/' + newProduct._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          product = res.body;
          done();
        });
    });

    afterEach(function() {
      product = {};
    });

    it('should respond with the requested product', function() {
      for(var attribute in validProductAttributes){
        newProduct[attribute].should.equal(validProductAttributes[attribute]);
      }
    });

  });

  describe('PUT /api/products/:id', function() {
    var updatedProduct

    beforeEach(function(done) {
      request(app)
        .put('/api/products/' + newProduct._id)
        .send(updateProductAttributes)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProduct = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProduct = {};
    });

    it('should respond with the updated product', function() {
      for(var attribute in updateProductAttributes){
        updatedProduct[attribute].should.equal(updateProductAttributes[attribute]);
      }
    });

  });

  describe('DELETE /api/products/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/products/' + newProduct._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when product does not exist', function(done) {
      request(app)
        .delete('/api/products/' + newProduct._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
