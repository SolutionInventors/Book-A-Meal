'use strict'; 
const mealRouter = require('./routers/meal-router'); 
const customerRouter = require('./routers/customer-router'); 
const catererRouter = require('./routers/caterer-router');
const menuRouter = require('./routers/menu-router');
const orderRouter = require('./routers/order-router');

const express = require('express'); 


const app = express(); 

app.use('/meals', mealRouter); 
app.use('/customer', customerRouter); 
app.use('/caterer', catererRouter); 
app.use('/menu', menuRouter); 
app.use('/orders', orderRouter); 


