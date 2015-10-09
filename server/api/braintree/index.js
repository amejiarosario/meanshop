'use strict';

var express = require('express');
var controller = require('./braintree.controller');

var router = express.Router();

router.get('/client_token', controller.clientToken);
router.post('/checkout', controller.checkout);

module.exports = router;
