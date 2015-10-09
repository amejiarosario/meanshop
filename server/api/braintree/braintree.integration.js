'use strict';

var app = require('../..');
var request = require('supertest');

var newBraintree;

describe('Braintree API:', function() {

  describe('GET /api/braintree', function() {
    var braintrees;

    beforeEach(function(done) {
      request(app)
        .get('/api/braintree')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          braintrees = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(braintrees).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/braintree', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/braintree')
        .send({
          name: 'New Braintree',
          info: 'This is the brand new braintree!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newBraintree = res.body;
          done();
        });
    });

    it('should respond with the newly created braintree', function() {
      expect(newBraintree.name).to.equal('New Braintree');
      expect(newBraintree.info).to.equal('This is the brand new braintree!!!');
    });

  });

  describe('GET /api/braintree/:id', function() {
    var braintree;

    beforeEach(function(done) {
      request(app)
        .get('/api/braintree/' + newBraintree._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          braintree = res.body;
          done();
        });
    });

    afterEach(function() {
      braintree = {};
    });

    it('should respond with the requested braintree', function() {
      expect(braintree.name).to.equal('New Braintree');
      expect(braintree.info).to.equal('This is the brand new braintree!!!');
    });

  });

  describe('PUT /api/braintree/:id', function() {
    var updatedBraintree

    beforeEach(function(done) {
      request(app)
        .put('/api/braintree/' + newBraintree._id)
        .send({
          name: 'Updated Braintree',
          info: 'This is the updated braintree!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBraintree = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBraintree = {};
    });

    it('should respond with the updated braintree', function() {
      expect(updatedBraintree.name).to.equal('Updated Braintree');
      expect(updatedBraintree.info).to.equal('This is the updated braintree!!!');
    });

  });

  describe('DELETE /api/braintree/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/braintree/' + newBraintree._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when braintree does not exist', function(done) {
      request(app)
        .delete('/api/braintree/' + newBraintree._id)
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
