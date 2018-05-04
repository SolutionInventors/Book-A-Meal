'use strict';

var _chai = require('chai');

var _Order = require('../../models/Order');

var _Order2 = _interopRequireDefault(_Order);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/* eslint no-undef : "warn" */
describe('menu', function () {
  var orderarr = ['item1', 'fh'];
  var customer = 'customer1';
  var date = 'chi';

  var order = new _Order2.default(orderarr, customer, date);
  describe('value of instanciation', function () {
    it('expects created value to be an object', function () {
      _chai.assert.isObject(order);
    });

    it('expects created value to be a subclass of order', function () {
      _chai.assert.isTrue(order instanceof _Order2.default);
    });
  });

  it('expects created value to be a  to have an date attribute ', function () {
    _chai.assert.isDefined(order.date);
  });

  it('expects created value to be a  to have an order attribute ', function () {
    _chai.assert.isDefined(order.order);
  });

  it('expects  value to be a string', function () {
    _chai.assert.typeOf(order.date, 'string');
  });

  it('expects to return id ', function () {
    _chai.assert.isDefined(order.id);
  });

  it('expects created value to be a  boolean ', function () {
    _chai.assert.isDefined(order.isValid);
  });

  it('expects created value to be a  boolean ', function () {
    _chai.assert.isTrue(order.isValid);
  });

  it('expects creted value of order to be ' + orderarr, function () {
    _chai.assert.isTrue(order.order == orderarr);
  });

  it('expects creted value of customer to be ' + customer, function () {
    _chai.assert.isTrue(order.customer == customer);
  });
  it('expects creted value of date to be ' + date, function () {
    _chai.assert.isTrue(order.date == date);
  });
});
//# sourceMappingURL=Order.test.js.map
//# sourceMappingURL=Order.test.js.map