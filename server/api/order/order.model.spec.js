var Order = require('./order.model');
var Product = require('../product/product.model');
var User = require('../user/user.model');

describe('Order', function() {
  beforeEach(cleanDb);
  after(cleanDb);

  describe('#create', function() {
    var products,
        products_attributes = [
          {title: 'Product 1', price: 111.11 },
          {title: 'Product 2', price: 2222.22 },
        ],
        user = new User({
          provider: 'local',
          name: 'Fake User',
          email: 'test@test.com',
          password: 'password'
        });

    beforeEach(function (done) {
      Product.create(products_attributes, function (err, data) {
        if(err) return done(err);
        products = data;
        return user.save();
      }).then(function () {
        done();
      }, done);
    });

    it('should create an order with valid attributes', function(done) {
      var attributes = {
        items: products.map(function(p){ return p._id; }),
        user: user._id,
        total: products.reduce(function(p, c) { return p.price + c.price; }),
      };

      Order.create(attributes).then(function (results) {
        return Order.findOne({}).populate(['products', 'user']);
      }).then(function(order){
        order.items.length.should.be.equal(2);
        order.total.should.be.equal(111.11+2222.22);
        order.shipping.should.be.equal(0.0);
        order.tax.should.be.equal(0.0);
        order.discount.should.be.equal(0.0);
        done();
      }).then(null, done);
    });

    it('should not create an Order without total', function(done) {
      var invalid_attributes = {
        items: products.map(function(p){ return p._id; }),
        user: user._id,
      };

      Order.createAsync(invalid_attributes)
      .then(function (res) {
        done(new Error('Validation failed. Should not create order ' + res));
      })
      .catch(function(err){
        err.should.not.be.null;
        err.message.should.match(/validation\ failed/);
        done();
      });
    });
  });
});

function cleanDb(done){
  Order.remove().then(function () {
    return Product.remove();
  }).then(function () {
    return User.remove();
  }).then(function () {
    done();
  }).then(null, done);
}
