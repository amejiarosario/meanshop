'use strict';

var path = require('path');
var config = browser.params;
var ProductModel = require(config.serverConfig.root + '/server/api/product/product.model');
var UserModel = require(config.serverConfig.root + '/server/api/user/user.model');
var page = require('../account/login/login.po');
var navbar = require('../components/navbar/navbar.po');
var user = {
  provider: 'local',
  name: 'Test User',
  email: 'test@test.com',
  password: 'test'
};
var admin = {
  provider: 'local',
  role: 'admin',
  name: 'Admin',
  email: 'admin@admin.com',
  password: 'admin'
};

describe('Products View', function() {
  var product = require('./product.po'),
      timestamp = (new Date()).getTime(),
      title = 'Product ' + timestamp,
      description = title + ' description',
      price = parseInt(timestamp / 100000000000),
      filePath = '../fixtures/meanbook.jpg',
      absolutePath = path.resolve(__dirname, filePath),
      newFilePath = '../fixtures/meanstack.png',
      newAbsPath = path.resolve(__dirname, newFilePath);

  before(function () {
    return ProductModel.removeAsync().then(function () {
      return UserModel.removeAsync();
    }).then(function(){
      return UserModel.createAsync(user, admin);
    });
  });

  after(function () {
    return ProductModel.removeAsync().then(function () {
      return UserModel.removeAsync();
    });
  });

  describe('Authentication', function() {
    beforeEach(function () {
      browser.get(config.baseUrl + '/login');
    });

    it('should NOT create a product with a non-authenticated user', function() {
      browser.get(config.baseUrl + '/products/new');
      expect(browser.getCurrentUrl()).to.eventually.equal(config.baseUrl + '/admin-access');
    });

    it('should NOT create a product with a non-admin user', function() {
      page.login(user);
      navbar.navbarAccountGreeting.click();
      browser.get(config.baseUrl + '/products/new');
      expect(browser.getCurrentUrl()).to.not.eventually.match(/\/products\/new$/);
    });

    it('should access a product with an admin user', function() {
      page.login(admin);
      navbar.navbarAccountGreeting.click();
      navbar.createProduct.click();
      expect(browser.getCurrentUrl()).to.eventually.match(/\/products\/new$/);
    });
  });

  describe('CREATE Products', function() {

    beforeEach(function () {
      browser.get(config.baseUrl + '/login');
      page.login(admin);
      // link to create product
      navbar.navbarAccountGreeting.click();
      navbar.createProduct.click();
      expect(browser.getCurrentUrl()).to.eventually.match(/\/products\/new$/);

      // filling out the form
      product.inputTitle.sendKeys(title);
      product.inputDescription.sendKeys(description);
    });

    it('should create a product', function() {
      product.inputFile.sendKeys(absolutePath);
      element(by.model('product.price')).sendKeys(price);
      product.saveButton.click().then(function () {
        // should redirect to product view
        expect(browser.getCurrentUrl()).to.eventually.match(/view$/);

        // should have fields
        expect(product.title.getText()).to.eventually.equal(title);
        expect(product.description.getText()).to.eventually.equal(description);
        expect(product.price.getText()).to.eventually.equal('$' + price.toFixed(2));
      });
    });

    it('should show an error if price is not provided', function() {
      product.inputFile.sendKeys(absolutePath);
      product.saveButton.click();
      expect(element(by.className('errors')).getText()).to.eventually.match(/`price` is required/);
      expect(browser.getCurrentUrl()).to.eventually.match(/\/products\/new$/);
    });

    it('should show an error if picture is not uploaded', function() {
      product.inputTitle.sendKeys('no pic');
      element(by.model('product.price')).sendKeys(price);
      product.saveButton.click();
      expect(element(by.className('errors')).getText()).to.eventually.match(/file/);
      expect(browser.getCurrentUrl()).to.eventually.match(/\/products\/new$/);
    });
  });

  describe('READ Products', function() {
    beforeEach(function () {
      browser.get(config.baseUrl + '/login');
      page.login(admin);
      navbar.menuItem('Products').click();
    });

    it('should have the newly created product', function() {
      expect(element.all(product.products.column("product.title")).getText()).to.eventually.contain(title);
      expect(element.all(product.products.column("product.price")).getText()).to.eventually.contain('$' + price.toFixed(2));
    });

  });

  describe('UPDATE products', function() {
    beforeEach(function () {
      browser.get(config.baseUrl + '/login');
      page.login(admin);
      navbar.menuItem('Products').click();
    });

    it('should update the title, description, price and image', function() {
      element(by.linkText(title)).click();
      element(by.linkText('EDIT')).click();
      expect(browser.getCurrentUrl()).to.eventually.match(/edit$/);

      product.inputTitle.sendKeys('Updated');
      product.inputDescription.sendKeys('Updated');
      product.inputPrice.sendKeys('.12');
      product.inputFile.sendKeys(newAbsPath);
      product.saveButton.click().then(function () {
        expect(browser.getCurrentUrl()).not.to.eventually.match(/edit$/);
        expect(product.title.getText()).to.eventually.equal(title + 'Updated');
        expect(product.description.getText()).to.eventually.equal(description + 'Updated');
        expect(product.price.getText()).to.eventually.equal('$' + (price + 0.12).toFixed(2));
        expect(product.imageSrc.getAttribute('src')).to.eventually.match(/png$/);
      });
    });
  });

  describe('DELETE products', function () {
    beforeEach(function () {
      browser.get(config.baseUrl + '/login');
      page.login(admin);
      navbar.menuItem('Products').click();
    });

    it('should be able to delete existing product', function() {
      element(by.linkText(title + 'Updated')).click();
      element(by.linkText('DELETE')).click();
      expect(browser.getCurrentUrl()).to.eventually.match(/\/products$/);
      expect(element.all(product.products.column("product.title")).getText()).not.to.eventually.contain(title + 'Updated');
    });
  });
});
