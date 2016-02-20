'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var catalogCtrlStub = {
  index: 'catalogCtrl.index',
  show: 'catalogCtrl.show',
  create: 'catalogCtrl.create',
  update: 'catalogCtrl.update',
  destroy: 'catalogCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var catalogIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './catalog.controller': catalogCtrlStub
});

describe('Catalog API Router:', function() {

  it('should return an express router instance', function() {
    expect(catalogIndex).to.equal(routerStub);
  });

  describe('GET /api/catalogs', function() {

    it('should route to catalog.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'catalogCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/catalogs/:id', function() {

    it('should route to catalog.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'catalogCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/catalogs', function() {

    it('should route to catalog.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'catalogCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/catalogs/:id', function() {

    it('should route to catalog.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'catalogCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/catalogs/:id', function() {

    it('should route to catalog.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'catalogCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/catalogs/:id', function() {

    it('should route to catalog.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'catalogCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
