'use strict';

describe.only('Products View', function() {
  var page = require('./product.po'),
      timestamp = (new Date()).getTime(),
      title = 'Product ' + timestamp,
      description = title + ' description',
      price = parseInt(timestamp / 100000000000);

  describe('CREATE Products', function() {
    beforeEach(function () {
      browser.get('/');
      // link to create product
      element(by.buttonText('Add Product')).click();
      expect(browser.getCurrentUrl()).to.eventually.match(/\/products\/new$/);

      // filling out the form
      element(by.model('product.title')).sendKeys(title);
      element(by.model('product.description')).sendKeys(description);
    });

    it('should create a product', function() {
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
      page.saveButton.click();
      expect(element(by.className('errors')).getText()).to.eventually.match(/`price` is required/);
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

    it('should truncate long descriptions to 100 chars', function() {
      expect(element.all(page.products.column("product.description")).first().getText())
        .to.eventually.equal(description.substring(0, 100) + ' ...');
    });
  });

  describe('UPDATE products', function() {
    beforeEach(function () {
      browser.get('/products');
      expect(element.all(page.products).count()).to.eventually.equal(1);
      page.detailsLink.click();
      element(by.linkText('Edit')).click();
      expect(browser.getCurrentUrl()).to.eventually.match(/edit$/);
    });

    it('should update the title', function() {
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
      expect(element.all(page.products).count()).to.eventually.equal(1);
      page.detailsLink.click();
      element(by.linkText('Delete')).click();
      expect(browser.getCurrentUrl()).to.eventually.match(/\/products$/);
      expect(element.all(page.products).count()).to.eventually.equal(0);
    });
  });
});
