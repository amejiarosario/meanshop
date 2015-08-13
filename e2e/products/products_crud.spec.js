'use strict';


describe('Products View', function() {
  var page = require('./product.po'),
      timestamp = (new Date()).getTime(),
      title = 'Product ' + timestamp,
      description = title + ' description',
      price = parseInt(timestamp / 100000000000);

  describe('CREATE Products', function() {
    beforeEach(function () {
      browser.get('/products');
      // link to create product
      element(by.linkText('New Product')).click();
      expect(browser.getCurrentUrl()).toMatch(/\/products\/new$/);

      // filling out the form
      element(by.model('product.title')).sendKeys(title);
      element(by.model('product.description')).sendKeys(description);
    });

    it('should create a product', function() {
      element(by.model('product.price')).sendKeys(price);
      page.saveButton.click();

      // should redirecto to product page
      expect(browser.getCurrentUrl()).toMatch(/\/products\//);

      // should have fields
      expect(page.title.getText()).toBe(title);
      expect(page.description.getText()).toBe(description);
      expect(page.price.getText()).toBe('$' + price.toFixed(2));
    });

    it('should show an error if price is not provided', function() {
      page.saveButton.click();
      expect(element(by.className('errors')).getText()).toMatch(/`price` is required/);
      expect(browser.getCurrentUrl()).toMatch(/\/products\/new$/);
    });
  });

  describe('READ Products', function() {
    beforeEach(function () {
      browser.get('/products');
    });

    it('should have the newly created product', function() {
      expect(element.all(page.products.column("product.title")).first().getText()).toBe(title);
      expect(element.all(page.products.column("product.price")).first().getText()).toBe('$' + price.toFixed(2));
    });

    it('should truncate long descriptions to 100 chars', function() {
      expect(element.all(page.products.column("product.description")).first().getText())
        .toBe(description.substring(0, 100) + ' ...');
    });
  });

  describe('UPDATE products', function() {
    beforeEach(function () {
      browser.get('/products');
      expect(element.all(page.products).count()).toBe(1);
      page.detailsLink.click();
      element(by.linkText('Edit')).click();
      expect(browser.getCurrentUrl()).toMatch(/edit$/);
    });

    it('should update the title', function() {
      page.inputTitle.sendKeys('Updated');
      page.inputDescription.sendKeys('Updated');
      page.inputPrice.sendKeys('.12');
      page.saveButton.click();
      expect(browser.getCurrentUrl()).not.toMatch(/edit$/);
      expect(page.title.getText()).toBe(title + 'Updated');
      expect(page.description.getText()).toBe(description + 'Updated');
      expect(page.price.getText()).toBe('$' + (price + 0.12).toFixed(2));
    });
  });

  describe('DELETE products', function () {
    it('should be able to delete existing product', function() {
      browser.get('/products');
      expect(element.all(page.products).count()).toBe(1);
      page.detailsLink.click();
      element(by.linkText('Delete')).click();
      expect(browser.getCurrentUrl()).toMatch(/\/products$/);
      expect(element.all(page.products).count()).toBe(0);
    });
  });
});
