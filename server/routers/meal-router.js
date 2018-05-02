const express = require('express'); 
const MealController = require('../controllers/meal-controller'); 
const mealRouter = require('express').Router(); 

const controller = new MealController(mealRouter); 
module.exports = mealRouter; 

