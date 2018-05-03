import { Router } from 'express'; 
import MealController from '../controllers/meal-controller'; 
import dummyMeals from '../dumbData/dummyMeals'; 
const mealRouter = Router(); 

new MealController(mealRouter); 
export default mealRouter; 
dummyMeals();
