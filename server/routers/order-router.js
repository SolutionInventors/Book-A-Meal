const express = require('express'); 
const OrderController = require('../controllers/order-controller'); 
const orderRouter = require('express').Router(); 

const controller = new OrderController(orderRouter); 
module.exports = orderRouter; 

