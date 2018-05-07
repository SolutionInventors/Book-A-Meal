import mealService from "../services/meal-service";
import Meal from "../models/Meal";

export default function () {
   
    for (let i = 0; i < 50; i++) {
        let meal = new Meal(`Rice${i}`, 2000 + i, 'img.jpg')
        mealService.createMeal(meal);
    }
}