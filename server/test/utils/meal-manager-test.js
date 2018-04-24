const mealManager = require('../../utils/meal-manager'); 
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

    
    describe('Managing meal functions', function(){
        describe('addMeal()', function(){
            let obj = mealManager.addMeal("Rice", 3000)
            it("Add meal should return an object", function(){
                assert.isObject(obj); 
            }); 
            it("Add meal object should have an id ", function(){
                assert.isNumber(obj.id); 
            }); 
        }); 
        describe('getAllMeals()', function(){
            it("Get all meals should return an array", function(){
                meals = mealManager.getAllMeals(); 
                assert.isArray(meals); 
            });
        }); 
       
        describe("updateMeal()",function(){
            it(`updateMeal(1, "Beans", 300)  should return true`, function(){
                let result = mealManager.updateMeal(1,"Beans", 300); 
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
