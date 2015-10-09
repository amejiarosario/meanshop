'use strict';

var braintree = require('braintree');
var config = require('../../config/environment');
var isProduction = config.env === 'production';

var gateway = braintree.connect({
  environment: isProduction ? braintree.Environment.Production : braintree.Environment.Sandbox,
  merchantId: config.braintree.clientMerchant,
  publicKey: config.braintree.clientID,
  privateKey: config.braintree.clientSecret
});

module.exports = gateway;
