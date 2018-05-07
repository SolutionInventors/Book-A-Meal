import { Router } from 'express';
import MealController from '../controllers/meal-controller';
import dummyMeals from '../dumbData/dummyMeals';

const mealRouter = Router();

const mealController = new MealController();

mealRouter.get('/', mealController.getAll);
mealRouter.get('/:id', mealController.getById);
mealRouter.post('/', mealController.create);
mealRouter.put('/:id', mealController.modify);
mealRouter.delete('/:id', mealController.delete);

export default mealRouter;
dummyMeals();
