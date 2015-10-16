'use strict';

describe('AdminCtrl', function() {
  beforeEach(module('meanshopApp'));

  var Product, User, $state, $controller, controller, $scope;

  var productAttributes = [
    {_id: 1, title: 'Product1', price: 100.10, stock: 10},
    {_id: 2, title: 'Product2', price: 200.00, stock: 20}
  ];

  var userAttributes = [
    {_id: 1, name: 'User1', email: 'user1@example.com', provider: 'local'},
    {_id: 2, name: 'User2', email: 'user2@example.com', provider: 'facebook'}
  ];

  beforeEach(inject(function (_$controller_, $rootScope, _User_, _Product_) {
    $controller = _$controller_;
    $scope = $rootScope.$new();

    User = _User_;
    Product = _Product_;

    sinon.stub(User, 'query').returns(userAttributes);
    sinon.stub(User, 'remove');
    sinon.stub(Product, 'query').returns(productAttributes);
    sinon.stub(Product, 'remove');

    $state = { go: sinon.stub() };
  }));

  describe('$scope.users', function() {
    beforeEach(function () {
      controller = $controller('AdminCtrl', {
        $scope: $scope,
        User: User
      });
    });

    it('loads the users', function() {
      expect($scope.users).to.eql(userAttributes);
    });

    it('deletes users', function() {
      var user1 = userAttributes[0];
      var user2 = userAttributes[1];
      $scope.deleteUser(user1);
      assert(User.remove.calledOnce);
      expect(angular.equals($scope.users, [user2])).to.eql(true);
    });
  });

  describe('$scope.products', function() {
    var product1 = productAttributes[0];
    var product2 = productAttributes[1];

    beforeEach(function () {
      controller = $controller('AdminCtrl', {
        $scope: $scope,
        $state: $state,
        Product: Product,
      });
    });

    it('loads the products', function() {
      expect($scope.products).to.eql(productAttributes);
    });

    it('deletes products', function() {
      $scope.deleteProduct(product1);
      assert(Product.remove.calledOnce);
      expect(angular.equals($scope.products, [product2])).to.eql(true);
    });

    it('redirects to edit form', function() {
      $scope.editProduct(product1);
      $state.go.should.have.been.calledWith('editProduct', {id: product1._id});
    });

    it('redirects to product show', function() {
      $scope.showProduct(product2);
      $state.go.should.have.been.calledWith('viewProduct', {id: product2._id});
    });
  });

});
