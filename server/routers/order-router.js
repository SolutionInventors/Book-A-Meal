import { Router } from 'express';
import OrderController from '../persistent-controllers/order-controller';

const orderRouter = Router();

const controller = new OrderController(orderRouter);
orderRouter.get('/', controller.getTodayOrders);
orderRouter.post('/', controller.makeOrder);
orderRouter.put('/:id', controller.modify);
orderRouter.all('/*', controller.noRoute);

export default orderRouter;

