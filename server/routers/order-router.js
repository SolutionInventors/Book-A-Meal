import { Router } from 'express';
import OrderController from '../controllers/order-controller';

const orderRouter = Router();

const controller = new OrderController(orderRouter);
orderRouter.get('/', controller.getTodayOrder);
orderRouter.post('/', controller.makeOrder);
orderRouter.put('/:id', controller.modify);

export default orderRouter;

