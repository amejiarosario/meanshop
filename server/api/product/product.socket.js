/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Product = require('./product.model');

exports.register = function(socket) {
  Product.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Product.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('product:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('product:remove', doc);
}