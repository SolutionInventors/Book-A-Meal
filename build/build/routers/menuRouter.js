'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _menuController = require('../controllers/menuController');

var _menuController2 = _interopRequireDefault(_menuController);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// import verifyToken from '../mddlewares/verifyToken';

var menuRouter = (0, _express.Router)();
// menuRouter.use(verifyToken);
var controller = new _menuController2.default();

menuRouter.get('/', controller.retrieve);
menuRouter.post('/', controller.create);
menuRouter.put('/', controller.update);

exports.default = menuRouter;
//# sourceMappingURL=menuRouter.js.map
//# sourceMappingURL=menuRouter.js.map