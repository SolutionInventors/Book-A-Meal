const mealManager = require('../utils/meal-manager'); 
const assert = require('chai').assert;

describe('Meal Manager', function(){
    describe('Order Functions', function(){
        describe('makeOrder()', function(){
            it("makeOrder should return boolean", function(){
                assert.isBoolean(mealManager.makeOrder()); 
            });
            it("makeOrder should return false", function(){
                assert.isBoolean(mealManager.makeOrder([])); 
            });
            it("Make an order should return false", function(){
                assert.isBoolean(mealManager.makeOrder({
                    meal: "Rice", 
                    amount:2000, 
                })); 
            });
        }); 
    }); 

    let meals = [{}]; 
    describe('Managing meal functions', function(){
        describe('getAllMeals()', function(){
            it("Get all meals should return an array", function(){
                meals = mealManager.getAllMeals(); 
                assert.isArray(meals); 
            });
        }); 
        describe('addMeal()', function(){
            
            it("Add meal should return true", function(){
                assert.isTrue(mealManager.addMeal("Rice", 3000))
            }); 
        }); 
        describe("updateMeal",function(){
            it(`updateMeal(${meals[0].id}, "Beans", 300)  should return true`, function(){
                let result = mealManager.updateMeal(meals[0].id,"Beans", 300); 
                assert.isTrue(result);  
            });
        }); 

        describe("removeMeal()",function(){
            it("Remove a meal should return boolean", function(){
                assert.isBoolean(mealManager.removeMeal(1)); 
                assert.isBoolean(mealManager.removeMeal(5)); 
            }); 
        });     
            
            
        
    
    
    }); 
        
       
   
    
   

}); 
