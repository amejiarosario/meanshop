'use strict';

var config = browser.params;
var UserModel = require(config.serverConfig.root + '/server/api/user/user.model');

describe('Logout View', function() {
  var login = function(user) {
    browser.get(config.baseUrl + '/login');
    require('../login/login.po').login(user);
  };

  var testUser = {
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  };

  beforeEach(function() {
    return UserModel
      .removeAsync()
      .then(function() {
        return UserModel.createAsync(testUser);
      })
      .then(function() {
        return login(testUser);
      });
  });

  after(function() {
    return UserModel.removeAsync();
  })

  describe('with local auth', function() {

    it('should logout a user and redirecting to "/"', function() {
      var navbar = require('../../components/navbar/navbar.po');

      expect(browser.getCurrentUrl()).to.eventually.equal(config.baseUrl + '/');
      expect(navbar.navbarAccountGreeting.getText()).to.eventually.match(new RegExp(testUser.name));

      browser.get(config.baseUrl + '/logout');

      navbar = require('../../components/navbar/navbar.po');

      expect(browser.getCurrentUrl()).to.eventually.equal(config.baseUrl + '/');
      expect(navbar.navbarAccountGreeting.isDisplayed()).to.eventually.equal(false);
    });

  });
});
