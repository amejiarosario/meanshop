'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var braintreeCtrlStub = {
  index: 'braintreeCtrl.index',
  show: 'braintreeCtrl.show',
  create: 'braintreeCtrl.create',
  update: 'braintreeCtrl.update',
  destroy: 'braintreeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var braintreeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './braintree.controller': braintreeCtrlStub
});

describe('Braintree API Router:', function() {

  it('should return an express router instance', function() {
    expect(braintreeIndex).to.equal(routerStub);
  });

  describe('GET /api/braintree', function() {

    it('should route to braintree.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'braintreeCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/braintree/:id', function() {

    it('should route to braintree.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'braintreeCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/braintree', function() {

    it('should route to braintree.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'braintreeCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/braintree/:id', function() {

    it('should route to braintree.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'braintreeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/braintree/:id', function() {

    it('should route to braintree.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'braintreeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/braintree/:id', function() {

    it('should route to braintree.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'braintreeCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
