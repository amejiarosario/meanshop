'use strict';

describe('Controller: ProductsCtrl', function () {
  var controller, scope, Product, state, mockProduct;

  var validAttributes = [
    {_id: 1, title: 'Product 1', price: 100.10, stock: 10 },
    {_id: 2, title: 'Product 2', price: 200.20, stock: 10 },
  ];

  beforeEach(module('meanshopApp'));

  beforeEach(inject(function ($rootScope, _Product_/*, $state*/) {
    scope = $rootScope.$new();
    mockProduct = validAttributes[0];
    Product = _Product_;

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

    it('should create a new product and redirect to products', function() {
      var stub = sinon.stub(Product, 'save', callCallbackWithError(false));
      scope.product = mockProduct;
      scope.addProduct();
      assert(stub.withArgs(mockProduct).calledOnce);
      state.go.should.have.been.calledWith('viewProduct', {id: mockProduct._id});
    });

    it('should not redirect if save fails', function() {
      sinon.stub(Product, 'save', callCallbackWithError(true));
      scope.product = mockProduct;
      scope.addProduct();
      expect(state.go.calledOnce).to.equal(false);
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

    it('should edit product and redirect to view if success', function() {
      var stub = sinon.stub(Product, 'update', callCallbackWithError(false));
      scope.editProduct();
      assert(stub.withArgs({id: mockProduct._id}).calledOnce);
      state.go.should.have.been.calledWith('viewProduct', {id: mockProduct._id});
    });

    it('should not redirect if failed', function() {
      sinon.stub(Product, 'update', callCallbackWithError(true, mockProduct));
      scope.editProduct();
      expect(state.go.calledOnce).to.equal(false);
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
