import { Router } from 'express';
import CatererController from '../controllers/customer-controller';

const catererRouter = Router();

const catererController = new CatererController();

catererRouter.post('/login', catererController.login);
catererRouter.post('/signup', catererController.register);
catererRouter.get('/', catererController.getAll);
export default catererRouter;

