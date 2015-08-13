'use strict';

describe('Login View', function() {
  var page = require('./auth.po');
  var username = 'User 1';

  beforeEach(function() {
    browser.get('/');
  });

  it('sign up using the email/password', function() {
    page.signUpLink.click();
    page.name.sendKeys(username);
    page.email.sendKeys('user1@test.com');
    page.password.sendKeys('S3cr3t1');
    page.signUpButton.click();
    expect(page.signUpLink.isPresent()).toBe(false);
    expect(page.username.getText()).toContain(username);
  });

  it('logout', function () {
    page.logoutLink.click();
    expect(page.username.getText()).not.toContain(username);
    expect(page.signUpLink.isPresent()).toBe(true);
  });
});
