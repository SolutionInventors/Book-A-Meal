import express from 'express';
import mealRouter from './mealRouter';
import menuRouter from './menuRouter';
import orderRouter from './orderRouter';
import userRouter from './userRouter';

const apiV1Router = express.Router();

apiV1Router.use('/v1/meals', mealRouter);
apiV1Router.use('/v1/menu', menuRouter);
apiV1Router.use('/v1/orders', orderRouter);
apiV1Router.use('/v1/auth', userRouter);

export default apiV1Router;
