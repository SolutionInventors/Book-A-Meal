
const mealManager = require('../utils/meal-manager'); 
const assert = require('chai').assert;

describe('Managing meal functions', function(){
    describe('createMeal()', ()=> {
        describe('createMeal("Rice", 300) ', function(){
            let obj = mealManager.createMeal("Rice", 3000)
            it('should return an object', function(){
                assert.isObject(obj); 
            }); 
            it('returned object should have an id' , ()=>{
                assert.isNumber(obj.id); 
            }); 
            
        }); 
        describe('createMeal("Rice", undefined) should return false', function(){
            let bool = mealManager.createMeal("Rice"); 
            it("should return boolean", ()=> {
                assert.isBoolean(bool); 
            })
            it("should return false", ()=> {
                assert.isFalse(bool); 
            }); 
        }); 
    }); 
   describe('Meal Retrieval functions', ()=> {
        describe('getAllMeals()', ()=> {
            it("Get all meals should return an array", function(){
                meals = mealManager.getAllMeals(); 
                assert.isArray(meals); 
            });
            
        }); 
        describe('getMealByName(mealName)', ()=> {
            it('getMealName()undefined should return undefined', ()=> {
                let meal = mealManager.getMealByName(); 
                assert.isUndefined(meal); 
            }); 
            it('getMealByName("Rice") should return an object ', ()=> {
                let meal = mealManager.getMealByName('Rice'); 
                assert.isObject(meal); 
            }); 
       }); 
       describe('getMeal(id)', ()=> {
            it('getMeal(undefined) should return undefined', ()=> {
                let obj = mealManager.getMeal(); 
                assert.isUndefined(obj); 
            }); 
            it('getMeal(0) should return an object', ()=> {
                let obj = mealManager.getMeal(0); 
                assert.isObject(obj); 
            })
       }); 
   }); 
    
   describe('Meal management tests', ()=> {
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
    
   


describe('Meal Manager', function(){
    describe('Order Functions', function(){
        describe('makeOrder()', function(){
            it("makeOrder should return an object", function(){
                assert.isObject(mealManager.makeOrder()); 
            });
            it("makeOrder should return undefined", function(){
                assert.isObject(mealManager.makeOrder([])); 
            });
            it("Make an order should return false", function(){
                assert.isBoolean(mealManager.makeOrder({
                    meal: "Rice", 
                    amount:2000, 
                })); 
            });
        }); 
    }); 

    
    
   

}); 
