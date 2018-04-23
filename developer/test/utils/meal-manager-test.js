const mealManager = require('../../utils/meal-manager'); 
const assert = require('chai').assert;

describe('Order Test', function(){
    it("Make an order should return true", function(){
      
    });
}); 

describe('Managing Meal Options Tests', function(){
    let meals; 
    it("Add meal should return true", function(){
        assert.isTrue(mealManager.addMeal("Rice", 3000))
    }); 
    it("Get all meals should return an array", function(){
        meals = mealManager.getAllMeals()
        assert.isArray(meals); 
    });
    it("Update meal should return true", function(){
        let result = mealManager.updateMeal(meals[0].id,"Beans", 300); 
        assert.isTrue(result);  
    });
    it("Remove a meal should return boolean", function(){
        assert.isBoolean(mealManager.removeMeal(1)); 
        assert.isBoolean(mealManager.removeMeal(5)); 
        
    }); 


}); 
