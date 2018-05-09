import express from 'express';
import mealRouter from './meal-router';
// import customerRouter from './customer-router';
// import catererRouter from './caterer-router';
import menuRouter from './menu-router';
import orderRouter from './order-router';

const apiRouter = express.Router();

apiRouter.use('/v1/meals', mealRouter);
// apiRouter.use('/v1/customer', customerRouter);
// apiRouter.use('/v1/caterer', catererRouter);
apiRouter.use('/v1/menu', menuRouter);
apiRouter.use('/v1/orders', orderRouter);

export default apiRouter;
