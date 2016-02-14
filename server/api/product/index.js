'use strict';

var express = require('express');
var controller = require('./product.controller');
var multiparty = require('connect-multiparty');
var uploadOptions = { autoFile: true,
                      uploadDir: 'client/assets/uploads/'
}
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/:id/upload', multiparty(uploadOptions), controller.upload);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/:slug/catalog', controller.catalog);
router.get('/:term/search', controller.search);


module.exports = router;
