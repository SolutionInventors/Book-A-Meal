
import { v4 } from 'node-uuid';
import Meal from '../models/Meal';

class MealService {
  constructor() {
    this.meals = [];
  }

  getAllMeals() {
    return this.meals;
  }

  getById(mealId) {
    return this.meals.find(mealObj => mealObj.id == mealId);
  }

  exists(mealObj) {
    return this.meals.find(obj => mealObj.name == obj.name || mealObj.id == obj.id);
  }
  createMeal(mealObj) {
    if (mealObj instanceof Meal && mealObj.isValid()) {
      if (this.exists(mealObj)) {
        return false;
      }
      mealObj.id = v4();
      this.meals.push(mealObj);
      return mealObj;
    }
    return undefined;
  }

  getByName(mealName) {
    return this.meals.find(mealObj => mealObj.name == mealName);
  }


  update(mealId, newMealObj) {
    if (newMealObj instanceof Meal) {
      const mealIndex = this.meals.findIndex(obj => obj.id == mealId);

      if (mealIndex >= 0 && newMealObj.isValid()) {
        newMealObj.id = this.meals[mealIndex].id;
        this.meals[mealIndex] = newMealObj;
        return newMealObj;
      }
      return false;
    }
    return undefined;
  }

  delete(mealId) {
    const index = this.meals.findIndex(obj => obj.id === mealId);
    if (index >= 0) return this.meals.splice(index, 1)[0];
    return undefined;
  }
}

export default new MealService();
