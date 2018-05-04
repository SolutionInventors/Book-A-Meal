'use strict';

var _mealService = require('../../services/meal-service');

var _mealService2 = _interopRequireDefault(_mealService);

var _chai = require('chai');

var _Meal = require('../../models/Meal');

var _Meal2 = _interopRequireDefault(_Meal);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

describe('meal-services', function () {
  var name = 'name1';
  var amount = 'amount';
  var image = 'image1';
  var theMeal = new _Meal2.default(name, amount, image);
  var validObj = _mealService2.default.createMeal(theMeal);
  var getNameObj = _mealService2.default.getByName(name);
  var getByIDObj = _mealService2.default.getMealById(validObj.id);

  describe('valid meal object test', function () {
    it('checks if created item is an object', function () {
      _chai.assert.isObject(_mealService2.default);
    });

    it('should return all the meals in db', function () {
      _chai.assert.isDefined(_mealService2.default.getAllMeals());
    });

    it('should create a new meal using values passed', function () {
      _chai.assert.isDefined(validObj);
    });

    describe('get by name and id and their respective test', function () {
      it('testing return value for name', function () {
        _chai.assert.isDefined(getNameObj);
      });

      it('expects returned value to have an name of ' + name, function () {
        _chai.assert.isTrue(getNameObj.name == name);
      });

      it('expects returned value to have a name of' + amount, function () {
        _chai.assert.isTrue(getNameObj.amount == amount);
      });
      it('expects returned value to have a password of ' + image, function () {
        _chai.assert.isTrue(getNameObj.image == image);
      });

      it('testing return value for name', function () {
        _chai.assert.isDefined(getByIDObj);
      });

      it('expects returned value to have an name of ' + name, function () {
        _chai.assert.isTrue(getByIDObj.name == name);
      });

      it('expects returned value to have a name of' + amount, function () {
        _chai.assert.isTrue(getByIDObj.amount == amount);
      });
      it('expects returned value to have a password of ' + image, function () {
        _chai.assert.isTrue(getByIDObj.image == image);
      });
    });
    it('should find a meal using ID', function () {
      _chai.assert.isDefined(getByIDObj);
    });
    it('should delete a meal using ID', function () {
      _chai.assert.isDefined(_mealService2.default.delete(validObj.id));
    });
  });

  describe('invalid meal object test', function () {
    it('should create a new meal using values passed', function () {
      _chai.assert.isDefined(_mealService2.default.createMeal());
    });

    it('testing return value for name', function () {
      _chai.assert.isDefined(_mealService2.default.getByName());
    });

    it('should find a meal using ID', function () {
      _chai.assert.isDefined(_mealService2.default.getMealById());
    });

    it('should delete a meal using ID', function () {
      _chai.assert.isDefined(_mealService2.default.delete(undefined));
    });
  });
});
//# sourceMappingURL=meal-service.test.js.map
//# sourceMappingURL=meal-service.test.js.map