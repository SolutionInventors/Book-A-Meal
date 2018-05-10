'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _orderController = require('../controllers/orderController');

var _orderController2 = _interopRequireDefault(_orderController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderRouter = (0, _express.Router)();

var controller = new _orderController2.default(orderRouter);
orderRouter.get('/', controller.getTodayOrders);
orderRouter.post('/', controller.makeOrder);
// orderRouter.put('/:id', controller.modify);
orderRouter.all('/*', controller.noRoute);

exports.default = orderRouter;
//# sourceMappingURL=orderRouter.js.map