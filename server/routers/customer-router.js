const express = require('express'); 
const CustomerController = require('../controllers/customer-controller'); 
const customerRouter = require('express').Router(); 

const controller = new CustomerController(customerRouter); 
module.exports = customerRouter; 

