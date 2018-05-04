'use strict';

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

var _chai = require('chai');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/* eslint no-undef : "warn" */
describe('caterer', function () {
  var email = 'email';
  var name = 'chi';
  var pass = 'password';
  var user = new _User2.default(name, email, pass);

  it('expects creted value to be an object', function () {
    _chai.assert.isObject(user);
  });

  it('expects creted value to be a subclass of caterer', function () {
    _chai.assert.isTrue(user instanceof _User2.default);
  });

  it('expects creted value to be a  to have an email attribute ', function () {
    _chai.assert.isDefined(user.email);
  });

  it('expects creted value to be a  to have an name attribute ', function () {
    _chai.assert.isDefined(user.name);
  });

  it('expects creted value to be a  to have an password attribute ', function () {
    _chai.assert.isDefined(user.password);
  });

  it('expects creted value of email to be ' + email, function () {
    _chai.assert.isTrue(user.email == email);
  });

  it('expects creted value of email to be ' + name, function () {
    _chai.assert.isTrue(user.name == name);
  });
  it('expects creted value of email to be ' + pass, function () {
    _chai.assert.isTrue(user.password == pass);
  });
});
//# sourceMappingURL=User.test.js.map
//# sourceMappingURL=User.test.js.map