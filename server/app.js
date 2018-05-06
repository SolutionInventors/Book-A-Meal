import mealRouter from './routers/meal-router';
import customerRouter from './routers/customer-router';
import catererRouter from './routers/caterer-router';
import menuRouter from './routers/menu-router';
import orderRouter from './routers/order-router';
import bodyParser from 'body-parser';
import express from 'express';
import dumbUsers from './dumbData/dumbUsers';

dumbUsers();

const port = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());
app.use('/meals', mealRouter);
app.use('/customer', customerRouter);
app.use('/caterer', catererRouter);
app.use('/menu', menuRouter);
app.use('/orders', orderRouter);


app.listen(port, (err) => {
  if (err) console.log('Error');
  else {
    console.log(`Successfully set up in port ${port}`);
  }
});

app.get('/*', (req, resp) => {
  resp.status(404).json({
    success: false,
    message: 'Specified route is not valid',
  });
});
