import express from 'express';
import CustomerController from '../controllers/customer-controller';

const customerRouter = express.Router();

const customerController = new CustomerController(customerRouter);
customerRouter.post('/signup', customerController.register);
customerRouter.post('/login', customerController.login);
customerRouter.get('/', customerController.getAll);
export default customerRouter;

