'use strict';

/* jshint expr: true */
var should = require('should');
var app = require('../../app');
var request = require('supertest');
var async = require('async');
var Product = require('./product.model.js');

describe('Products API', function() {
  var validAttributes = [
    {title: 'Product1', price: 123.45 },
    {title: 'Product2', price: 678.90 }
  ];

  var invalidAttributes = [
    {title: 'invalid', price: -120 }
  ];

  var existingProduct;

  beforeEach(function (done) {
    cleanAndCreateProducts(validAttributes, function(err, results){
      if(err) done(err);
      existingProduct = JSON.parse(JSON.stringify(results[0]));
      done();
    });
  });

  describe('index - GET /api/products', function() {

    it('should respond with empty array when NO products', function(done) {
      Product.remove(function (err) {
        if(err) done(err);

        request(app)
          .get('/api/products')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            res.body.should.eql([]);
            done();
          });
      })
    });

    it('should return a list of products', function(done) {
      var firstProduct = [validAttributes[0]],
          secondProduct = [validAttributes[1]];

      request(app)
        .get('/api/products')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.length.should.eql(validAttributes.length);
          res.body.should.containDeep(firstProduct);
          res.body.should.containDeep(secondProduct);
          done();
        });
    });

  });

  describe('show - GET /api/products/:id', function() {

    it('should return found product when exists', function(done) {
      request(app)
        .get('/api/products/' + existingProduct._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.eql(existingProduct);
          done();
        });
    });

    it('should return status 404 when product does NOT exist', function(done) {
      request(app)
        .get('/api/products/fa15e0000000000000000000')
        .expect(404)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.match(/not found/i);
          done();
        });
    });

    it('should return status 500 when ObjectId is malformed', function(done) {
      request(app)
        .get('/api/products/123')
        .expect(500)
        // .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.error.should.not.be.empty;
          res.body.message.should.match(/cast.*failed/i);
          done();
        });
    });

  });

  describe('create - POST /api/products', function() {
    it('should create a product with valid data', function(done) {
      request(app)
        .post('/api/products')
        .expect(201)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(validAttributes[0])
        .end(function(err, res) {
          if(err) return done(err);
          res.body.should.containDeep(validAttributes[0]);
          done();
        });
    });

    it('should NOT create a product with invalid data', function(done) {
      request(app)
        .post('/api/products')
        .expect(500)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(invalidAttributes[0])
        .end(function(err, res) {
          if(err) return done(err);
          res.error.should.not.be.empty;
          res.body.message.should.match(/validation failed/i);
          done();
        });
    });

  });

  describe('update - PUT /api/products/:id', function() {

    it('should update the product with valid data', function(done) {
      request(app)
        .put('/api/products/' + existingProduct._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .send({title: 'valid title'})
        .end(function(err, res) {
          if(err) return done(err);
          res.body.should.have.property('title', 'valid title');
          res.body.should.have.property('price', existingProduct.price);
          done();
        });
    });

    it('should NOT update with invalid data', function(done) {
      request(app)
        .put('/api/products/' + existingProduct._id)
        .expect(500)
        .expect('Content-Type', /json/)
        .send({price: -999})
        .end(function(err, res) {
          if(err) return done(err);
          res.error.should.not.be.empty;
          res.body.message.should.match(/validation failed/i);
          done();
        });
    });

    it('should return status 404 when product does NOT exists', function(done) {
      request(app)
        .put('/api/products/fa15e0000000000000000000')
        .expect(404)
        .send({title: 'valid title'})
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.match(/not found/i);
          done();
        });
    });

    it('should return status 500 when ObjectId is malformed', function(done) {
      request(app)
        .put('/api/products/123')
        .expect(500)
        .expect('Content-Type', /json/)
        .send({title: 'valid title'})
        .end(function(err, res) {
          if (err) return done(err);
          res.error.should.not.be.empty;
          res.body.message.should.match(/cast.*failed/i);
          done();
        });
    });

  });

  describe('delete - DELETE /api/products/:id', function() {

    it('should delete an existing product', function(done) {
      request(app)
        .delete('/api/products/' + existingProduct._id)
        .expect(204)
        .end(function(err, res) {
          if(err) return done(err);
          res.body.should.be.empty;
          done();
        });
    });

    it('should return status 404 when product does NOT exists', function(done) {
      request(app)
        .delete('/api/products/fa15e0000000000000000000')
        .expect(404)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.match(/not found/i);
          done();
        });
    });

    it('should return status 500 when ObjectId is malformed', function(done) {
      request(app)
        .delete('/api/products/123')
        .expect(500)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.error.should.not.be.empty;
          res.body.message.should.match(/cast.*failed/i);
          done();
        });
    });

  });

  function cleanAndCreateProducts(data, callback){
    Product.remove(function(err){
      if(err) return callback(err);
      async.map(data, Product.create.bind(Product), callback);
    });
  }
});
