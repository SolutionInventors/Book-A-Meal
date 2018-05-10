'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _orderService = require('../services/orderService');

var _orderService2 = _interopRequireDefault(_orderService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderController = function () {
  function OrderController() {
    _classCallCheck(this, OrderController);
  }

  _createClass(OrderController, [{
    key: 'getTodayOrders',
    value: function getTodayOrders(req, resp) {
      var errorCallback = function errorCallback() {
        resp.status(500).json({
          success: false,
          message: 'An error occured while processing your request'
        });
      };

      var success = function success(orders) {
        if (orders) {
          resp.status(200).json({
            success: true,
            orders: orders
          });
        } else {
          resp.status(204).json({
            success: true,
            message: 'No orders have been made today'
          });
        }
      };
      _orderService2.default.getOrdersByDate(success, errorCallback);
    }
  }, {
    key: 'makeOrder',
    value: function makeOrder(req, resp) {
      var _req$body = req.body,
          customerId = _req$body.customerId,
          mealsIdArr = _req$body.mealsIdArr;


      if (customerId && mealsIdArr) {
        var success = function success(order, meals) {
          console.log(meals);
          var orderObj = {
            order: order,
            meals: meals
          };
          resp.status(201).json({
            success: true,
            orderObj: orderObj
          });
        };
        var notValid = function notValid() {
          resp.status(404).json({
            success: false,
            message: 'No meal id you specified was found in today\'s menu'
          });
        };
        var noMenu = function noMenu() {
          resp.status(412).json({
            success: false,
            message: 'The meal of today has not yet been set'
          });
        };

        var errorCallback = function errorCallback(err) {
          console.log(err);
          resp.status(500).json({
            success: false,
            message: 'An unknown error occured while processing your request'
          });
        };
        _orderService2.default.makeOrder(mealsIdArr, customerId, success, notValid, noMenu, errorCallback);
      } else {
        resp.status(400).json({
          success: false,
          messge: 'Some required fields are missing in body'
        });
      }
    }
  }, {
    key: 'noRoute',
    value: function noRoute(req, resp) {
      resp.status(404).json({
        success: false,
        message: 'An invalid route was specified'
      });
    }
  }, {
    key: 'modify',
    value: function modify(req, resp) {
      var _req$body2 = req.body,
          orderId = _req$body2.orderId,
          mealsIdArr = _req$body2.mealsIdArr;


      if (mealsIdArr) {
        var success = function success(order, meals) {
          if (meals && order) {
            console.log(meals);
            var orderObj = {
              order: order,
              meals: meals
            };
            resp.status(201).json({
              success: true,
              orderObj: orderObj
            });
          } else if (order === false) {
            resp.status(404).json({
              success: false,
              message: 'The orderId you specified does not exist'
            });
          } else {
            resp.status(400).json({
              success: false,
              message: 'No valid id was found in your mealsIdArr'
            });
          }
        };

        var errorCallback = function errorCallback() {
          resp.status(500).json({
            success: false,
            message: 'An error occured while processing your request'
          });
        };
        _orderService2.default.modify(orderId, mealsIdArr, success, errorCallback);
      }
    }
  }]);

  return OrderController;
}();

exports.default = OrderController;
//# sourceMappingURL=orderController.js.map