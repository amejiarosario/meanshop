'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var slugs = require('mongoose-url-slugs');

var CatalogSchema = new Schema({
  name: { type: String, required: true},
  parent: { type: Schema.Types.ObjectId, ref: 'Catalog' },
  ancestors: [{ type: Schema.Types.ObjectId, ref: 'Catalog' }],
  children: [{ type: Schema.Types.ObjectId, ref: 'Catalog' }]
});

CatalogSchema.methods = {
  addChild: function (child) {
    var that = this;
    child.parent = this._id;
    child.ancestors = this.ancestors.concat([this._id]);
    return this.model('Catalog').create(child).addCallback(function (child) {
      that.children.push(child._id);
      that.save();
    });
  }
}

CatalogSchema.plugin(slugs('name'));

module.exports = mongoose.model('Catalog', CatalogSchema);
