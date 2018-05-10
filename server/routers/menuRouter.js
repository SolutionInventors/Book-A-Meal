import { Router } from 'express';
import MenuController from '../controllers/menuController';
// import verifyToken from '../mddlewares/verifyToken';

const menuRouter = Router();
// menuRouter.use(verifyToken);
const controller = new MenuController();

menuRouter.get('/', controller.retrieve);
menuRouter.post('/', controller.create);
menuRouter.put('/', controller.update);

export default menuRouter;

