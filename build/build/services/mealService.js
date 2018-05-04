'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var MealService = function () {
  function MealService() {
    _classCallCheck(this, MealService);
  }

  _createClass(MealService, [{
    key: 'create',
    value: function create(mealObj, successCallBack, onError) {
      _index2.default.Meal.create(mealObj).then(function (meal) {
        return successCallBack({
          id: meal.id,
          name: meal.name,
          amount: meal.amount,
          image: meal.image,
          createdAt: meal.createdAt
        });
      }).catch(function (error) {
        return onError(error);
      });
    }
  }, {
    key: 'getAll',
    value: function getAll(limit, callback, errorCallback) {
      _index2.default.Meal.findAll({ limit: limit }).then(function (meals) {
        callback(meals);
      }).catch(function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: 'getById',
    value: function getById(id, callback, errorCallback) {
      _index2.default.Meal.findOne({ where: { id: id } }).then(function (meal) {
        callback(meal);
      }).catch(function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: 'delete',
    value: function _delete(id, callback, errorCallback) {
      _index2.default.Meal.destroy({ where: { id: id } }).then(function (deletedRows) {
        return callback(deletedRows);
      }).catch(function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: 'modify',
    value: function modify(id, newMeal, successCallBack, errorCallback) {
      _index2.default.Meal.update(newMeal, {
        where: { id: id },
        returning: true
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            updatedRows = _ref2[0],
            _ref2$ = _slicedToArray(_ref2[1], 1),
            updatedMeal = _ref2$[0];

        successCallBack(updatedMeal, updatedRows);
      }).catch(function (err) {
        return errorCallback(err);
      });
    }
  }]);

  return MealService;
}();

exports.default = new MealService();
//# sourceMappingURL=mealService.js.map
//# sourceMappingURL=mealService.js.map