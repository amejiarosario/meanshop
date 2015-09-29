/*jshint expr: true*/

'use strict';

describe('Service: Product', function () {

  // load the service's module
  beforeEach(module('meanshopApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  // instantiate service
  var Product,
      $httpBackend,
      validAttributes = [
        {title: 'Product1', price: 123.45 },
        {title: 'Product2', price: 678.90 }
      ],
      newAttributes = {title: 'Product3', price: 1000 },
      productWithId = angular.extend({}, newAttributes, {id: 123});

  beforeEach(inject(function (_Product_, _$httpBackend_) {
    Product = _Product_;
    $httpBackend = _$httpBackend_;
  }));

  describe('#index', function() {
    it('should fetch products with HTTP GET request', function() {
      $httpBackend.expectGET('/api/products').respond(validAttributes);
      Product.query(function (products) {
        expect(products).to.equal(validAttributes);
      });
    });

    it('should work with empty data', function () {
      $httpBackend.expectGET('/api/products').respond([]);
      Product.query(function (products) {
        expect(products).to.equal([]);
      });
    });
  });

  describe('#show', function() {
    it('should get a single product by id', function() {
      $httpBackend
        .expectGET('/api/products/1')
        .respond(validAttributes[0]);
      Product.get({id: 1}, function(product){
        expect(product).to.equal(validAttributes[0]);
      });
    });
  });

  describe('#create', function() {
    beforeEach(function() {
      $httpBackend
        .expect('POST', '/api/products', JSON.stringify(newAttributes))
        .respond(productWithId);
    });

    it('should create a new Product from the class', function() {
      var newProduct = Product.save(newAttributes, successCb(productWithId));
      expect(toJson(newProduct)).to.eql(newAttributes);
    });

    it('should create a new product from the instance', function() {
      var product = new Product();
      product.title = 'Product3';
      product.price = 1000;

      product.$save(successCb(productWithId));
      expect(toJson(product)).to.eql(newAttributes);
    });

  });

  describe('#update', function() {
    var updatedValues = {title: 'new title', price: 987};

    it('should update attributes with PUT', function() {
      $httpBackend
        .expectPUT('/api/products/123', updatedValues)
        .respond(angular.extend({}, updatedValues, {id: 123}));

      Product.update({id: 123}, updatedValues, function(product){
        expect(product.id).to.be(123);
        expect(product.price).to.be(987);
        expect(product.title).to.be('new title');
      });
    });
  });

  describe('#delete', function() {
    it('should delete product', function() {
      $httpBackend
        .expectDELETE('/api/products/123')
        .respond({});
      Product.remove({id: 123}, successCb);
    });
  });

  function toJson(obj){
    return JSON.parse(JSON.stringify(obj));
  }

  function successCb(match){
    return function(value/*, responseHeaders*/){
      expect(value).to.equal(match);
    };
  }
});
