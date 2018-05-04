'use strict';

var _orderService = require('../../services/order-service');

var _orderService2 = _interopRequireDefault(_orderService);

var _menu = require('../services/menu');

var _menu2 = _interopRequireDefault(_menu);

var _chai = require('chai');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Order = require('../../models/Order');

describe('order-services', function () {
  var orderarr = ['item1', 'fh'];
  var customer = 'customer1';
  var date = 'chi';

  var anOrder = new Order(orderarr, customer, date);
  var ObjreturnedbymakeOrder = _orderService2.default.makeOrder(anOrder);

  describe('valid order object test', function () {
    it('checks if created item is an object', function () {
      _chai.assert.isObject(_orderService2.default);
    });

    it('should return all the orders in db', function () {
      _chai.assert.isDefined(_orderService2.default.getAllMeals());
    });

    it('should create a new order using values passed', function () {
      _chai.assert.isDefined(validObj);
    });
    describe('get by name and id and their respective test', function () {
      it('testing return value for name', function () {
        _chai.assert.isDefined(ObjreturnedbymakeOrder);
      });

      it('expects returned value to have an name of ' + orderarr, function () {
        _chai.assert.isTrue(ObjreturnedbymakeOrder.orderarr == orderarr);
      });

      it('expects returned value to have a name of' + customer, function () {
        _chai.assert.isTrue(ObjreturnedbymakeOrder.customer == customer);
      });
      it('expects returned value to have a password of ' + date, function () {
        _chai.assert.isTrue(ObjreturnedbymakeOrder.date == date);
      });
    });
  });

  describe('invalid order object test', function () {
    it('should create a new order using values passed', function () {
      _chai.assert.isDefined(_orderService2.default.makeOrder());
    });

    it('testing return value for name', function () {
      _chai.assert.isDefined(_orderService2.default.modify());
    });

    it('should find a order using ID', function () {
      _chai.assert.isDefined(_orderService2.default.getOrdersByDate());
    });

    it('should delete a order using ID', function () {
      _chai.assert.isDefined(_orderService2.default.getOrderFromMealIdArr());
    });
  });
});
//# sourceMappingURL=order-service.test.js.map
//# sourceMappingURL=order-service.test.js.map