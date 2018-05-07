import mealService from '../../services/meal-service';
import { assert } from 'chai';

import Meal from '../../models/Meal';

describe('meal-services', () => {
  const name = 'name1';
  const amount = 'amount';
  const image = 'image1';
  const theMeal = new Meal(name, amount, image);
  const validObj = mealService.createMeal(theMeal);
  const getNameObj = mealService.getByName(name);
  const getByIDObj = mealService.getMealById(validObj.id);

  describe('valid meal object test', () => {
    it('checks if created item is an object', () => {
      assert.isObject(mealService);
    });

    it('should return all the meals in db', () => {
      assert.isDefined(mealService.getAllMeals());
    });


    it('should create a new meal using values passed', () => {
      assert.isDefined(validObj);
    });

    describe('get by name and id and their respective test', () => {
      it('testing return value for name', () => {
        assert.isDefined(getNameObj);
      });


      it(`expects returned value to have an name of ${name}`, () => {
        assert.isTrue(getNameObj.name == name);
      });

      it(`expects returned value to have a name of${amount}`, () => {
        assert.isTrue(getNameObj.amount == amount);
      });
      it(`expects returned value to have a password of ${image}`, () => {
        assert.isTrue(getNameObj.image == image);
      });


      it('testing return value for name', () => {
        assert.isDefined(getByIDObj);
      });


      it(`expects returned value to have an name of ${name}`, () => {
        assert.isTrue(getByIDObj.name == name);
      });

      it(`expects returned value to have a name of${amount}`, () => {
        assert.isTrue(getByIDObj.amount == amount);
      });
      it(`expects returned value to have a password of ${image}`, () => {
        assert.isTrue(getByIDObj.image == image);
      });
    });
    it('should find a meal using ID', () => {
      assert.isDefined(getByIDObj);
    });
    it('should delete a meal using ID', () => {
      assert.isDefined(mealService.delete(validObj.id));
    });
  });

  describe('invalid meal object test', () => {
    it('should create a new meal using values passed', () => {
      assert.isDefined(mealService.createMeal());
    });

    it('testing return value for name', () => {
      assert.isDefined(mealService.getByName());
    });

    it('should find a meal using ID', () => {
      assert.isDefined(mealService.getMealById());
    });


    it('should delete a meal using ID', () => {
      assert.isDefined(mealService.delete(undefined));
    });
  });
});
