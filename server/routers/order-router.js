import { Router } from 'express';
import OrderController from '../controllers/order-controller';

const orderRouter = Router();

const controller = new OrderController(orderRouter);
orderRouter.get('/', controller.getOrder);
orderRouter.post('/', controller.getOrder);

export default orderRouter;

