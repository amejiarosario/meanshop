'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  shipping: { type: Number, default: 0.0 },
  tax: { type: Number, default: 0.0 },
  discount: { type: Number, default: 0.0 },
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' }, // pending, in_progress, completed, canceled, refunded.
  payment: { type: String, default: 'paypal' },
});

module.exports = mongoose.model('Order', OrderSchema);
