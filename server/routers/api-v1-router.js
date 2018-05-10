import express from 'express';
import mealRouter from './meal-router';
import menuRouter from './menu-router';
import orderRouter from './order-router';
import authRouter from './auth-router';

const apiRouter = express.Router();

apiRouter.use('/v1/meals', mealRouter);
apiRouter.use('/v1/menu', menuRouter);
apiRouter.use('/v1/orders', orderRouter);
apiRouter.use('/v1/auth', authRouter);

export default apiRouter;
