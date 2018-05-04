'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mealRouter = require('./mealRouter');

var _mealRouter2 = _interopRequireDefault(_mealRouter);

var _menuRouter = require('./menuRouter');

var _menuRouter2 = _interopRequireDefault(_menuRouter);

var _orderRouter = require('./orderRouter');

var _orderRouter2 = _interopRequireDefault(_orderRouter);

var _userRouter = require('./userRouter');

var _userRouter2 = _interopRequireDefault(_userRouter);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var apiV1Router = _express2.default.Router();

apiV1Router.use('/v1/meals', _mealRouter2.default);
apiV1Router.use('/v1/menu', _menuRouter2.default);
apiV1Router.use('/v1/orders', _orderRouter2.default);
apiV1Router.use('/v1/auth', _userRouter2.default);

exports.default = apiV1Router;
//# sourceMappingURL=apiV1Router.js.map
//# sourceMappingURL=apiV1Router.js.map