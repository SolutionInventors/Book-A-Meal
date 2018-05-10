import { Router } from 'express';
import MenuController from '../controllers/menu-controller';
import verifyToken from '../mddlewares/middlewares';

const menuRouter = Router();

const controller = new MenuController();

menuRouter.get('/', verifyToken, controller.retrieve);
menuRouter.post('/', verifyToken, controller.create);
menuRouter.put('/', verifyToken, controller.update);

export default menuRouter;

