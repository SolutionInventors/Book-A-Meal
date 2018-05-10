'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mealService = require('../services/mealService');

var _mealService2 = _interopRequireDefault(_mealService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MealController = function () {
  function MealController() {
    _classCallCheck(this, MealController);
  }

  _createClass(MealController, [{
    key: 'getAll',
    value: function getAll(req, resp) {
      if (!req.user.caterer) {
        resp.status(401).json({
          success: false,
          message: 'Only Caterers are permitted here'
        });
        return;
      }
      var limit = req.body.limit ? req.body.limit : 100;
      var serverErrorCallback = function serverErrorCallback() {
        resp.status(500).json({
          success: false,
          message: 'An unknown error occured in the server'
        });
      };
      _mealService2.default.getAll(limit, function (meals) {
        if (meals.length > 0) {
          resp.json({
            success: true,
            meals: meals
          });
        } else {
          resp.status(204).json({
            success: true,
            message: 'There are no available meals in the database'
          });
        }
      }, serverErrorCallback);
    }
  }, {
    key: 'getById',
    value: function getById(req, resp) {
      if (req.user.userType !== 'caterer') {
        resp.status(409).json({
          success: false,
          message: 'Only Caterers are permitted here'
        });
        return;
      }
      var id = req.params.id;

      var successfunc = function successfunc(meal) {
        if (meal) {
          resp.status(200).json({
            success: true,
            meal: meal
          });
        } else {
          resp.status(404).json({
            success: false,
            message: 'The inputed id does not exist'
          });
        }
      };

      if (id) {
        var serverErrorCallback = function serverErrorCallback() {
          resp.status(500).json({
            success: false,
            message: 'An unknown error occured in the server'
          });
        };
        _mealService2.default.getById(id, successfunc, serverErrorCallback);
      } else {
        resp.status(400).json({
          success: false,
          message: 'Missing id'
        });
      }
    }
  }, {
    key: 'create',
    value: function create(req, resp) {
      if (!req.user.caterer) {
        resp.status(409).json({
          success: false,
          message: 'Only Caterers are permitted here'
        });
        return;
      }
      var _req$body = req.body,
          name = _req$body.name,
          amount = _req$body.amount,
          image = _req$body.image;

      if (name && amount && image) {
        var mealObj = { name: name, amount: amount, image: image };

        var errorCallback = function errorCallback(error) {
          if (error.name === 'SequelizeUniqueConstraintError') {
            resp.status(409).json({
              success: false,
              message: 'The meal name is already in the database'
            });
          } else {
            resp.status(500).json({
              success: false,
              message: 'An unknown error occured while processing your request'
            });
          }
        };

        var success = function success(meal) {
          resp.status(201).json({
            success: true,
            data: meal
          });
        };
        if (Number.isNaN(+name) && Number.isFinite(+amount)) {
          _mealService2.default.create(mealObj, success, errorCallback);
        } else {
          resp.status(404).json({
            success: false,
            message: 'The format of the inputed values is invalid. Ensure that amount is a number and name is a valid string'
          });
        }
      } else {
        var missingData = [];
        if (!name) missingData.push('name');
        if (!amount) missingData.push('amount');
        if (!image) missingData.push('image');
        resp.status(400).json({
          success: false,
          message: 'Some required data is missing in the body',
          missingData: missingData
        });
      }
    }
  }, {
    key: 'delete',
    value: function _delete(req, resp) {
      if (!req.user.caterer) {
        resp.status(409).json({
          success: false,
          message: 'Only Caterers are permitted here'
        });
        return;
      }
      var id = req.params.id;

      if (id) {
        var success = function success(deletedObj) {
          resp.status(200).json({
            success: true,
            data: deletedObj
          });
        };
        var notFound = function notFound() {
          resp.status(404).json({
            success: false,
            message: 'There is no meal with the specified id'
          });
        };
        _mealService2.default.delete(id, success, notFound);
      } else {
        resp.status(400).json({
          success: false,
          message: 'No meal id was specified',
          missingData: ['id']
        });
      }
    }
  }, {
    key: 'modify',
    value: function modify(req, resp) {
      if (!req.user.caterer) {
        resp.status(409).json({
          success: false,
          message: 'Only Caterers are permitted here'
        });
        return;
      }
      var _req$body2 = req.body,
          name = _req$body2.name,
          amount = _req$body2.amount,
          image = _req$body2.image;
      var id = req.params.id;

      if (name && amount && image) {
        if (id) {
          var newMealObj = { name: name, amount: amount, image: image };
          var success = function success(updatedMeal) {
            console.log(updatedMeal);
            if (updatedMeal) {
              resp.status(201).json({
                success: true,
                data: updatedMeal
              });
            } else {
              resp.status(404).json({
                success: false,
                message: 'The id you specified does not exist'
              });
            }
          };
          var serverErrorCallback = function serverErrorCallback(err) {
            if (err.name === 'SequelizeDatabaseError') {
              resp.status(500).json({
                success: false,
                message: 'The id you specified is not a UUID'
              });
            } else if (err.name === 'SequelizeUniqueConstraintError') {
              resp.status(409).json({
                success: false,
                message: 'The meal name is already in the database'
              });
            } else {
              resp.status(500).json({
                success: false,
                message: 'An unknown error occured while processing your request'
              });
            }
          };
          _mealService2.default.modify(id, newMealObj, success, serverErrorCallback);
        } else {
          resp.status(400).json({
            success: false,
            message: 'Meal id is missing'
          });
        }
      } else {
        var missingData = [];
        if (!name) {
          missingData.push('name');
        } else if (!amount) {
          missingData.push('amount');
        } else if (!image) {
          missingData.push('image');
        }
        resp.status(400).json({
          success: true,
          message: 'Some required data are missing',
          missingData: missingData
        });
      }
    }
  }]);

  return MealController;
}();

exports.default = MealController;
//# sourceMappingURL=mealController.js.map