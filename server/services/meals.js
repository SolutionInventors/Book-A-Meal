
const uuid = require('node-uuid') ; 
const Meal = require('../models/Meal')

class MealService{
    constructor(){
        this.meals = []; 
    }

    getAllMeals(){
        return this.meals; 
    }

    getMealById(mealId){
        return this.meals.find((mealObj)=> mealObj.id == mealId);
    }
    createMeal(mealObj){
        if(mealObj instanceof Meal && mealObj.isValid()){ 
            mealObj.id = uuid.v4(); 
            this.meals.push(mealObj); 
            return true; 
        }
        return false; 
    }

    getByName(mealName){
        return this.meals.find((mealObj)=> mealObj.mealName == mealName);
    }

    update(mealId,newMealObj){

        if(newMealObj instanceof Meal){
            let mealIndex = this.meals.findIndex((obj)=> obj.mealId==mealId); 

            if(mealIndex >= 0 && newMealObj.isValid()){
                newMealObj.id = this.meals[mealIndex].id; 
                this.meals[mealIndex] = newMealObj;
                return newObj; 
            }
            return false; 
        }

    }
}

module.exports =  new MealService();
