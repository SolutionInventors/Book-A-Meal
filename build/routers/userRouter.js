'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = _express2.default.Router();
var userController = new _userController2.default();

userRouter.post('/signup', userController.register);
userRouter.post('/login', userController.login);

exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map