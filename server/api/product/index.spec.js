'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var productCtrlStub = {
  index: 'productCtrl.index',
  show: 'productCtrl.show',
  create: 'productCtrl.create',
  update: 'productCtrl.update',
  destroy: 'productCtrl.destroy'
};

var authServiceStub = {
  isAuthenticated: function() {
    return 'authService.isAuthenticated';
  },
  hasRole: function(role) {
    return 'authService.hasRole.' + role;
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var productIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './product.controller': productCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Product API Router:', function() {

  it('should return an express router instance', function() {
    productIndex.should.equal(routerStub);
  });

  describe('GET /api/products', function() {

    it('should route to product.controller.index', function() {
      routerStub.get
                .withArgs('/', 'productCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/products/:id', function() {

    it('should route to product.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'productCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/products', function() {

    it('should route to product.controller.create', function() {
      routerStub.post
                .withArgs('/', 'authService.hasRole.admin', 'productCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/products/:id', function() {

    it('should route to product.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'authService.hasRole.admin', 'productCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/products/:id', function() {

    it('should route to product.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'authService.hasRole.admin', 'productCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/products/:id', function() {

    it('should route to product.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'authService.hasRole.admin', 'productCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
