'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _menuService = require('../services/menuService');

var _menuService2 = _interopRequireDefault(_menuService);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var MenuController = function () {
  function MenuController() {
    _classCallCheck(this, MenuController);
  }

  _createClass(MenuController, [{
    key: 'create',
    value: function create(req, resp) {
      var mealsIdArr = req.body.mealsIdArr;

      var success = function success(menuObj, meals) {
        resp.status(201).json({
          success: true,
          data: {
            menuId: menuObj.id,
            dateCreated: menuObj.dateCreated,
            meals: meals
          }
        });
      };

      var menuExists = function menuExists() {
        resp.status(409).json({
          success: false,
          message: 'The menu of today has already been created'
        });
      };

      var noValidId = function noValidId() {
        resp.status(422).json({
          success: false,
          message: 'There was no valid mealId in your mealsIdArr'
        });
      };

      if (mealsIdArr) {
        _menuService2.default.createTodayMenu(mealsIdArr, success, noValidId, menuExists);
      } else {
        resp.status(400).json({
          success: false,
          message: 'Some required fields are missing',
          missingData: ['mealsIdArr']
        });
      }
    }
  }, {
    key: 'update',
    value: function update(req, resp) {
      var mealsIdArr = req.body.mealsIdArr;

      if (mealsIdArr) {
        var errorHandler = function errorHandler() {
          resp.status(500).json({
            success: false,
            message: 'Error occured in server'
          });
        };
        var success = function success(menuObj, mealArr) {
          var createdObj = {
            menuId: menuObj.id,
            meals: mealArr
          };
          resp.status(201).json({
            success: true,
            createdObj: createdObj
          });
        };
        var noMenu = function noMenu() {
          resp.status(409).json({
            success: false,
            message: 'The menu of today has not yet been created'
          });
        };
        var noValidId = function noValidId() {
          resp.status(404).json({
            success: false,
            message: 'There was no valid mealId in your mealIdArr'
          });
        };

        _menuService2.default.updateTodayMenu(mealsIdArr, success, noMenu, noValidId, errorHandler);
      } else {
        resp.status(400).json({
          success: false,
          message: 'Some required fields are missing',
          missingData: ['mealsIdArr']
        });
      }
    }
  }, {
    key: 'retrieve',
    value: function retrieve(req, resp) {
      var success = function success(menu) {
        resp.status(200).json({
          success: true,
          menu: menu
        });
      };
      var notFound = function notFound() {
        resp.status(404).json({
          success: false,
          message: 'The specified menu of today has not yet been set'
        });
      };
      _menuService2.default.getMenu(success, notFound);
    }
  }]);

  return MenuController;
}();

exports.default = MenuController;
//# sourceMappingURL=menuController.js.map
//# sourceMappingURL=menuController.js.map