'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _mealController = require('../controllers/mealController');

var _mealController2 = _interopRequireDefault(_mealController);

var _verifyToken = require('../mddlewares/verifyToken');

var _verifyToken2 = _interopRequireDefault(_verifyToken);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var mealRouter = (0, _express.Router)();
mealRouter.use(_verifyToken2.default);

var mealController = new _mealController2.default();

mealRouter.get('/', mealController.getAll);
mealRouter.get('/:id', mealController.getById);
mealRouter.post('/', mealController.create);
mealRouter.put('/:id', mealController.modify);
mealRouter.delete('/:id', mealController.delete);

exports.default = mealRouter;
//# sourceMappingURL=mealRouter.js.map
//# sourceMappingURL=mealRouter.js.map