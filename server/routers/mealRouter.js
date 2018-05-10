import { Router } from 'express';
import MealController from '../controllers/mealController';
import verifyToken from '../mddlewares/verifyToken';

const mealRouter = Router();
mealRouter.use(verifyToken);

const mealController = new MealController();

mealRouter.get('/', mealController.getAll);
mealRouter.get('/:id', mealController.getById);
mealRouter.post('/', mealController.create);
mealRouter.put('/:id', mealController.modify);
mealRouter.delete('/:id', mealController.delete);

export default mealRouter;
