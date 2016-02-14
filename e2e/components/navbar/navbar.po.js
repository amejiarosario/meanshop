/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var NavbarComponent = function() {
  this.navbar = element(by.css('.navbar'));
  this.navbarHeader = this.navbar.element(by.css('.navbar-header'));
  this.navbarNav = this.navbar.element(by.css('#navbar-main .nav.navbar-nav:not(.navbar-right)'));
  this.navbarAccount = this.navbar.element(by.css('#navbar-main .nav.navbar-nav.navbar-right'));
  this.navbarAccountGreeting = this.navbarAccount.element(by.binding('getCurrentUser().name'));
  this.createProduct = this.navbar.element(by.linkText('Create Product'));
  this.menuItem = function (linkText) {
    return this.navbar.element(by.linkText(linkText));
  };
};

module.exports = new NavbarComponent();
