'use strict';

describe('Controller: ProductsCtrl', function () {
  var controller, scope, Product, state, mockProduct;

  var validAttributes = [
    {_id: 1, title: 'Product 1', price: 100.10, stock: 10 },
    {_id: 2, title: 'Product 2', price: 200.20, stock: 10 },
  ];

  beforeEach(module('meanshopApp'));

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    mockProduct = validAttributes[0];

    Product = jasmine.createSpyObj('Product',
      ['get', 'save', 'query', 'remove', 'delete', 'update']
    );
    state = jasmine.createSpyObj('state', ['go']);
    Product.get.andReturn(mockProduct);
    Product.query.andReturn(validAttributes);
  }));

  describe('ProductsCtrl', function() {
    beforeEach(inject(function ($controller) {
      controller = $controller('ProductsCtrl', {
        $scope: scope,
        Product: Product
      });
    }));

    it('should get all the products', function() {
      expect(scope.products).toBe(validAttributes);
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
      expect(scope.product).toBe(mockProduct);
    });

    it('should remove product and redirect if succeded', function() {
      Product.delete.andCallFake(callCallbackWithError());

      scope.deleteProduct(mockProduct);

      expect(Product.delete).toHaveBeenCalledWith(
        { id: mockProduct._id },
        jasmine.any(Function), // success handler
        jasmine.any(Function) // error handler
      );

      expect(state.go).toHaveBeenCalledWith('products');
    });

    it('should not redirect if an error occurs', function() {
      Product.delete.andCallFake(callCallbackWithError(true));
      scope.deleteProduct(mockProduct);
      expect(state.go).not.toHaveBeenCalled();
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
      Product.save.andCallFake(callCallbackWithError(false));
      scope.product = mockProduct;
      scope.addProduct();
      expect(Product.save).toHaveBeenCalledWith(
        mockProduct,
        jasmine.any(Function),
        jasmine.any(Function)
      );
      expect(state.go).toHaveBeenCalledWith('viewProduct', {id: mockProduct._id});
    });

    it('should not redirect if save fails', function() {
      Product.save.andCallFake(callCallbackWithError(true));
      scope.addProduct(mockProduct);
      expect(state.go).not.toHaveBeenCalled();
    });
  });

  describe('ProductEditCtrl', function() {
    beforeEach(inject(function ($controller) {
      controller = $controller('ProductEditCtrl', {
        $scope: scope,
        Product: Product,
        $state: state,
      });
    }));

    it('should get the product', function() {
      expect(scope.product).toBe(mockProduct);
    });

    it('should edit product and redirect to view if success', function() {
      Product.update.andCallFake(callCallbackWithError(false));
      scope.product = mockProduct;
      scope.editProduct();
      expect(Product.update).toHaveBeenCalledWith(
        {id: mockProduct._id},
        mockProduct,
        jasmine.any(Function),
        jasmine.any(Function)
      );
      expect(state.go).toHaveBeenCalledWith('viewProduct', {id: mockProduct._id});
    });

    it('should not redirect if failed', function() {
      Product.update.andCallFake(callCallbackWithError(true, mockProduct));
      scope.editProduct(mockProduct);
      expect(state.go).not.toHaveBeenCalled();
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
