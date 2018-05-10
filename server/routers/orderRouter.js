import { Router } from 'express';
import OrderController from '../controllers/orderController';

const orderRouter = Router();

const controller = new OrderController(orderRouter);
orderRouter.get('/', controller.getTodayOrders);
orderRouter.post('/', controller.makeOrder);
orderRouter.put('/:orderId', controller.modify);
orderRouter.all('/*', controller.noRoute);

export default orderRouter;

