'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderService = function () {
  function OrderService() {
    _classCallCheck(this, OrderService);
  }

  _createClass(OrderService, [{
    key: 'makeOrder',
    value: function makeOrder(mealsIdArr, customerId, successCallBack, noValidId, noMenu, erroCallback) {
      _index2.default.Menu.findOne({
        where: { dateCreated: new Date().toDateString() },
        includes: [{
          model: _index2.default.Meal,
          through: 'menuId',
          as: 'meals',
          where: { id: mealsIdArr }
        }]
      }).then(function (todayMenu) {
        if (todayMenu) {
          todayMenu.getMeals().then(function (meals) {
            if (meals.length > 0) {
              _index2.default.Order.create({
                customerId: customerId
              }).then(function (order) {
                order.addMeals(meals).then(function () {
                  return successCallBack(order, meals);
                });
              });
            } else {
              noValidId();
            }
          });

          successCallBack(todayMenu);
        } else {
          noMenu();
        }
      }).catch(function (error) {
        return erroCallback(error);
      });
    }
  }, {
    key: 'getOrdersByDate',
    value: function getOrdersByDate(callback, errorCallback) {
      var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date();

      _index2.default.Order.findAll({
        attributes: [['id', 'orderId']],
        include: [{
          model: _index2.default.Meal,
          through: 'orderId',
          as: 'meals'
        }],
        where: { dateCreated: date.toDateString() }
      }).then(function (orders) {
        callback(orders);
      }).catch(function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: 'getById',
    value: function getById(id, callback, errorHandler) {
      _index2.default.Order.findOne({
        where: { id: id }
      }).then(function (order) {
        return callback(order);
      }).catch(function (error) {
        return errorHandler(error);
      });
    }
  }, {
    key: 'modify',
    value: function modify(orderId, mealsIdArr, callback, errorCallback) {
      _index2.default.Meals.findOne({
        where: { id: mealsIdArr },
        includes: [{
          model: _index2.default.Menu,
          through: 'mealId',
          as: 'menus',
          where: { dateCreated: new Date().toDateString() },
          attributes: []
        }]
      }).then(function (meals) {
        if (meals.length > 0) {
          _index2.default.Order.findOne({
            where: { id: orderId }
          }).then(function (order) {
            order.setMeals(meals);
            callback(order, meals);
          });
        } else {
          callback();
        }
      }).catch(function (error) {
        return errorCallback(error);
      });
    }
  }]);

  return OrderService;
}();

exports.default = new OrderService();
//# sourceMappingURL=orderService.js.map