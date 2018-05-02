const express = require('express'); 
const MealController = require('../controllers/meal-controller'); 
const menuRouter =express.Router(); 

const controller = new MealController(mealRouter); 
module.exports = menuRouter; 

