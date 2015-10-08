'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

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
  status: { type: String, default: 'pending' }, // pending, in_progress, completed, canceled, refunded.
  payment: { type: String, default: 'paypal' },
  shippingAddress: String,
  billingAddress: String
});

module.exports = mongoose.model('Order', OrderSchema);
