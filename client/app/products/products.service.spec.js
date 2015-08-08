'use strict';

describe('Service: Product', function () {
  var Product, $httpBackend,
      validAttributes = [
        {title: 'Product1', price: 123.45 },
        {title: 'Product2', price: 678.90 }
      ],
      newAttributes = {title: 'Product3', price: 1000 },
      productWithId = angular.extend({}, newAttributes, {id: 123});

  beforeEach(module('meanshopApp'));
  beforeEach(inject(function (_Product_, _$httpBackend_) {
    Product = _Product_;
    $httpBackend = _$httpBackend_;

    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  }));

  afterEach(function() {
    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('index - list products', function() {
    it('should fetch products with HTTP GET request', function() {
      $httpBackend.expectGET('/api/products').respond(validAttributes);
      Product.query(function (products) {
        expect(products).toEqualData(validAttributes);
      });
    });

    it('should work with empty data', function () {
      $httpBackend.expectGET('/api/products').respond([]);
      Product.query(function (products) {
        expect(products).toEqualData([]);
      });
    });
  });

  describe('show - get a product', function() {
    it('should get a single product by id', function() {
      $httpBackend
        .expectGET('/api/products/1')
        .respond(validAttributes[0]);
      Product.get({id: 1}, function(product){
        expect(product).toEqualData(validAttributes[0]);
      });
    });

    itShouldHandleNotFoundWith('get');
  });

  describe('create - new product creation', function() {
    beforeEach(function() {
      $httpBackend
        .expect('POST', '/api/products', JSON.stringify(newAttributes))
        .respond(productWithId);
    });

    it('should create a new Product from the class', function() {
      var newProduct = Product.save(newAttributes,
        successCb(productWithId));

      expect(newProduct).toEqualData(newAttributes);
    });

    it('should create a new product from the instance', function() {
      var product = new Product();
      product.title = 'Product3';
      product.price = 1000;

      product.$save(successCb(productWithId));

      expect(product).toEqualData(newAttributes);
    });
  });

  describe('update - changes products attributes', function() {
    var updatedValues = {title: 'new title', price: 987};

    it('should update attributes with PUT', function() {
      $httpBackend
        .expectPUT('/api/products/123', updatedValues)
        .respond(angular.extend({}, updatedValues, {id: 123}));

      Product.update({id: 123}, updatedValues, function(product){
        expect(product.id).toBe(123);
        expect(product.price).toBe(987);
        expect(product.title).toBe('new title');
      });
    });

    itShouldHandleNotFoundWith('put', 'update');
  });

  describe('delete - remove products', function() {
    it('should delete product', function() {
      $httpBackend
        .expectDELETE('/api/products/123')
        .respond({});
      Product.remove({id: 123}, successCb);
    });

    itShouldHandleNotFoundWith('delete');
  });

  function successCb(match){
    return function(value/*, responseHeaders*/){
      expect(value).toEqualData(match);
    };
  }

  function itShouldHandleNotFoundWith(verb, fnName){
    return it('should return `not found` when ' + verb.toUpperCase() +
      ' /api/products/:id does not exist', function() {
      $httpBackend
        .expect(verb.toUpperCase(), '/api/products/999')
        .respond(404, 'not found');

      Product[fnName || verb.toLowerCase()]({id: 999}, {}, successCb, function fail(err) {
        expect(err.status).toBe(404);
        expect(err.data).toBe('not found');
      });
    });
  }

});
