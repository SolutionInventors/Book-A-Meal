import { Router } from 'express';
import MenuController from '../controllers/menu-controller';

const menuRouter = Router();

const controller = new MenuController(menuRouter);

menuRouter.get('/menu/', controller.retrieve);
menuRouter.post('/menu/', controller.create);
menuRouter.put('/menu/', controller.update);
export default menuRouter;

