'use strict';

describe('Controller: ProductsCtrl', function () {
  var controller, scope, Product, state, mockProduct, $q;

  var validAttributes = [
    {_id: 1, title: 'Product 1', price: 100.10, stock: 10 },
    {_id: 2, title: 'Product 2', price: 200.20, stock: 10 },
  ];

  beforeEach(module('meanshopApp'));

  beforeEach(inject(function ($rootScope, _Product_, _$q_ /*, $state*/) {
    scope = $rootScope.$new();
    mockProduct = validAttributes[0];
    Product = _Product_;
    $q = _$q_;

    sinon.stub(Product, 'query').returns(validAttributes);
    sinon.stub(Product, 'get').returns(mockProduct);

    state = { go: sinon.stub() };
  }));

  describe('ProductsCtrl', function() {
    beforeEach(inject(function ($controller) {
      controller = $controller('ProductsCtrl', {
        $scope: scope,
        Product: Product
      });
    }));

    it('should get all the products', function() {
      expect(scope.products).to.eql(validAttributes);
    });
  });

  describe('ProductViewCtrl', function() {
    beforeEach(inject(function ($controller) {
      controller = $controller('ProductViewCtrl', {
        $scope: scope,
        Product: Product,
        $state: state,
      });
    }));

    it('should get a single product', function() {
      expect(scope.product).to.eql(mockProduct);
    });

    it('should remove product and redirect if succeded', function() {
      var stub = sinon.stub(Product, 'delete', callCallbackWithError());
      scope.deleteProduct();
      state.go.should.have.been.calledWith('products');
      assert(stub.withArgs({id: mockProduct._id}).calledOnce);
    });

    it('should not redirect if an error occurs', function() {
      sinon.stub(Product, 'delete', callCallbackWithError(true));
      scope.deleteProduct();
      expect(state.go.calledOnce).to.equal(false);
    });
  });

  describe('ProductNewCtrl', function() {
    beforeEach(inject(function ($controller) {
      controller = $controller('ProductNewCtrl', {
        $scope: scope,
        Product: Product,
        $state: state,
      });
    }));

    it('should create a new product and redirect to products', function(done) {
      var d = $q.defer();
      var productSave = sinon.stub(Product, 'save').returns({$promise: d.promise});
      var productUpload = sinon.stub(Product, 'upload').returns(d.promise);
      scope.product = mockProduct;
      scope.product.picture = 'mock-picture';
      scope.addProduct().then(function () {
        assert(productSave.withArgs(mockProduct).calledOnce);
        assert(productUpload.withArgs(scope.product.picture, mockProduct._id).calledOnce);
        state.go.should.have.been.calledWith('viewProduct', {id: mockProduct._id});
        done();
      });
      d.resolve(mockProduct);
      scope.$digest();
    });

    it('should not redirect if save fails', function(done) {
      var d = $q.defer();
      var productSave = sinon.stub(Product, 'save').returns({$promise: d.promise});
      scope.product = mockProduct;
      scope.addProduct().then(function functionName() {
        assert(productSave.withArgs(mockProduct).calledOnce);
        expect(state.go.calledOnce).to.equal(false);
        done();
      });
      d.reject();
      scope.$digest();
    });
  });

  describe('ProductEditCtrl', function() {
    beforeEach(inject(function ($controller) {
      controller = $controller('ProductEditCtrl', {
        $scope: scope,
        Product: Product,
        $state: state,
      });

      scope.product = mockProduct;
    }));

    it('should get the product', function() {
      expect(scope.product).to.equal(mockProduct);
    });

    it('should edit product and redirect to view if success', function(done) {
      var d = $q.defer();
      var productUpdate = sinon.stub(Product, 'update').returns({$promise: d.promise});
      var productUpload = sinon.stub(Product, 'upload').returns(d.promise);
      scope.product = mockProduct;
      scope.product.picture = 'mock-picture-updated';
      scope.editProduct().then(function () {
        assert(productUpdate.calledOnce);
        assert(productUpload.withArgs(scope.product.picture, mockProduct._id).calledOnce);
        state.go.should.have.been.calledWith('viewProduct', {id: mockProduct._id});
        done();
      });
      d.resolve(mockProduct);
      scope.$digest();
    });

    it('should not redirect if failed', function(done) {
      var d = $q.defer();
      var productUpdate = sinon.stub(Product, 'update').returns({$promise: d.promise});
      scope.product = mockProduct;
      scope.editProduct().then(function functionName() {
        assert(productUpdate.calledOnce);
        expect(state.go.calledOnce).to.equal(false);
        done();
      });
      d.reject();
      scope.$digest();
    });
  });

  function callCallbackWithError(err){
    return function(/* arguments */){
      var length    = arguments.length;
      var errorCb   = arguments[length-1];
      var successCb = arguments[length-2];
      var params    = arguments[length-3];

      if(err){
        return errorCb(err);
      } else {
        return successCb(params);
      }
    };
  }
});
