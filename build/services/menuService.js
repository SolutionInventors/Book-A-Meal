'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MenuService = function () {
  function MenuService() {
    _classCallCheck(this, MenuService);
  }

  _createClass(MenuService, [{
    key: 'createTodayMenu',
    value: function createTodayMenu(mealsIdArr, successCallBack, noValidId, alreadyCreated) {
      _index2.default.Meal.findAll({
        where: { id: mealsIdArr },
        attributes: ['id', 'amount', 'name', 'image']
      }).then(function (meals) {
        if (meals && meals.length > 0) {
          _index2.default.Menu.create({ dateCreated: new Date().toDateString() }).then(function (todayMenu) {
            return todayMenu.addMeals(meals).then(function () {
              return successCallBack(todayMenu, meals);
            });
          }).catch(function (error) {
            return alreadyCreated(error);
          });
        } else {
          noValidId();
        }
      });
    }
  }, {
    key: 'getMenu',
    value: function getMenu(callBack, menuNotSet) {
      var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date();

      _index2.default.Menu.findOne({
        where: { dateCreated: date.toDateString() },
        include: [{
          model: _index2.default.Meal,
          through: {
            foreignKey: 'mealId',
            attributes: []
          },
          attributes: ['id', 'amount', 'name', 'image'],
          as: 'meals'
        }]
      }).then(function (menu) {
        if (menu) callBack(menu);else {
          menuNotSet();
        }
      });
    }
  }, {
    key: 'updateTodayMenu',
    value: function updateTodayMenu(mealsIdArr, callback, noMenuCallback, noValidId, errorHandler) {
      _index2.default.Meal.findAll({
        where: { id: mealsIdArr },
        attributes: ['id', 'amount', 'name', 'image']
      }).then(function (meals) {
        if (meals.length > 0) {
          _index2.default.Menu.findOne({
            where: { dateCreated: new Date().toDateString() }
          }).then(function (todayMenu) {
            if (todayMenu) {
              todayMenu.setMeals(meals).then(function () {
                callback(todayMenu, meals);
              });
            } else {
              noValidId();
            }
          }).catch(function (error) {
            return errorHandler(error);
          });
        } else {
          noValidId();
        }
      });
    }
  }, {
    key: 'retrieve',
    value: function retrieve(callback, noMenuCallback) {
      _index2.default.Menu.findOne({
        attributes: ['id', 'createdAt'],
        where: { createdAt: new Date() },
        include: [{
          model: _index2.default.Meal,
          through: {
            foreignKey: 'mealId',
            attributes: ['id', 'name']
          },
          as: 'meals'
        }]
      }).then(function (menu) {
        if (!menu) noMenuCallback();else {
          _index2.default.MenuMeal.findAll({
            where: { menuId: menu.id }
          }).then(function (menuMeals) {
            var whereArr = menuMeals.map(function (menuMeal) {
              return menuMeal.mealId;
            });
            _index2.default.Meal.findAll({
              where: { mealId: whereArr },
              attributes: ['id', 'name', 'amount', 'image']
            }).then(function (meals) {
              callback(menu, meals);
            });
          });
        }
      });
    }
  }]);

  return MenuService;
}();

exports.default = new MenuService();
//# sourceMappingURL=menuService.js.map