const express = require('express'); 
const CatererController = require('../controllers/customer-controller'); 
const catererRouter = require('express').Router(); 

const controller = new CatererController(customerRouter); 
module.exports = catererRouter; 

