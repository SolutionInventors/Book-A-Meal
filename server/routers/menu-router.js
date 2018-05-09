import { Router } from 'express';
import MenuController from '../controllers/menu-controller';

const menuRouter = Router();

const controller = new MenuController();

menuRouter.get('/', controller.retrieve);
menuRouter.post('/', controller.create);
menuRouter.put('/', controller.update);

export default menuRouter;

