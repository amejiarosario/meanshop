'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var Braintree = require('../braintree/braintree.model');

var OrderDetailsSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  total: Number
});

var OrderSchema = new Schema({
  total: { type: Number, required: true },
  products: [OrderDetailsSchema],
  name: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  shipping: { type: Number, default: 0.0 },
  tax: { type: Number, default: 0.0 },
  discount: { type: Number, default: 0.0 },
  status: { type: String, default: 'pending' }, // pending, paid/failed, delivered, canceled, refunded.
  shippingAddress: String,
  billingAddress: String,
  payload: Schema.Types.Mixed,
  paymentType: { type: String, default: 'braintree' },
  paymentStatus: Schema.Types.Mixed
});

// deserialize the payload into the proper fields
// and execute payment
OrderSchema.pre('validate', function (next) {
  this.total = this.payload.cart.totalCost;
  this.tax = this.payload.cart.tax;
  this.shipping = this.payload.cart.shipping;
  this.products = this.payload.cart.items;
  this.user = this.payload.user;
  executePayment(this, function (err, result) {
    this.paymentStatus = result;
    if(err || !result.success){
      this.status = 'failed';
      next(err || result.errors);
    } else {
      this.status = 'paid';
      next();
    }
  }.bind(this));
});

function executePayment(obj, cb){
  Braintree.transaction.sale({
    amount: obj.total,
    paymentMethodNonce: obj.payload.nonce,
  }, cb);
}

module.exports = mongoose.model('Order', OrderSchema);
