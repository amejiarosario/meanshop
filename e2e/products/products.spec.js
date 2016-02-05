'use strict';

var path = require('path');

describe.only('Products View', function() {
  var page = require('./product.po'),
      timestamp = (new Date()).getTime(),
      title = 'Product ' + timestamp,
      description = title + ' description',
      price = parseInt(timestamp / 100000000000),
      filePath = '../fixtures/meanbook.jpg',
      absolutePath = path.resolve(__dirname, filePath);

  describe('CREATE Products', function() {
    beforeEach(function () {
      browser.get('/');
      // link to create product
      element(by.buttonText('Add Product')).click();
      expect(browser.getCurrentUrl()).to.eventually.match(/\/products\/new$/);

      // filling out the form
      page.inputTitle.sendKeys(title);
      page.inputDescription.sendKeys(description);
    });

    it('should create a product', function() {
      page.inputFile.sendKeys(absolutePath);
      element(by.model('product.price')).sendKeys(price);
      page.saveButton.click();

      // should redirecto to product page
      expect(browser.getCurrentUrl()).to.eventually.match(/\/products\//);

      // should have fields
      expect(page.title.getText()).to.eventually.equal(title);
      expect(page.description.getText()).to.eventually.equal(description);
      expect(page.price.getText()).to.eventually.equal('$' + price.toFixed(2));
    });

    it('should show an error if price is not provided', function() {
      page.inputFile.sendKeys(absolutePath);
      page.saveButton.click();
      expect(element(by.className('errors')).getText()).to.eventually.match(/`price` is required/);
      expect(browser.getCurrentUrl()).to.eventually.match(/\/products\/new$/);
    });

    it('should show an error if picture is not uploaded', function() {
      page.inputTitle.sendKeys('no pic');
      element(by.model('product.price')).sendKeys(price);
      page.saveButton.click();
      expect(element(by.className('errors')).getText()).to.eventually.match(/file/);
      expect(browser.getCurrentUrl()).to.eventually.match(/\/products\/new$/);
    });
  });

  describe('READ Products', function() {
    beforeEach(function () {
      browser.get('/products');
    });

    it('should have the newly created product', function() {
      expect(element.all(page.products.column("product.title")).first().getText()).to.eventually.equal(title);
      expect(element.all(page.products.column("product.price")).first().getText()).to.eventually.equal('$' + price.toFixed(2));
    });

  });

  describe('UPDATE products', function() {
    it('should update the title', function() {
      browser.get('/products');
      element(by.linkText(title)).click();
      element(by.linkText('EDIT')).click();
      expect(browser.getCurrentUrl()).to.eventually.match(/edit$/);

      page.inputTitle.sendKeys('Updated');
      page.inputDescription.sendKeys('Updated');
      page.inputPrice.sendKeys('.12');
      page.saveButton.click();
      expect(browser.getCurrentUrl()).not.to.eventually.match(/edit$/);
      expect(page.title.getText()).to.eventually.equal(title + 'Updated');
      expect(page.description.getText()).to.eventually.equal(description + 'Updated');
      expect(page.price.getText()).to.eventually.equal('$' + (price + 0.12).toFixed(2));
    });
  });

  describe('DELETE products', function () {
    it('should be able to delete existing product', function() {
      browser.get('/products');
      element(by.linkText(title + 'Updated')).click();
      element(by.linkText('DELETE')).click();
      expect(browser.getCurrentUrl()).to.eventually.match(/\/products$/);
      expect(element.all(page.products.column("product.title")).getText()).not.to.eventually.contain(title + 'Updated');
    });
  });
});
