import express from 'express';
import CustomerController from '../controllers/customer-controller';

const customerRouter = express.Router();

const customerController = new CustomerController(customerRouter);
customerRouter.use('/signup', customerController.register);
customerRouter.use('/login', customerController.login);

export default customerRouter;

