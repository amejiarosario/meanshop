'use strict';

var LoginPage = function() {
  this.signUpLink = element(by.linkText('Sign up'));
  this.logoutLink = element(by.linkText('Logout'));
  this.name = element(by.model('user.name'));
  this.email = element(by.model('user.email'));
  this.password = element(by.model('user.password'));
  this.signUpButton = element(by.buttonText('Sign up'));
  this.username = element(by.binding('getCurrentUser().name'));
};

module.exports = new LoginPage();
