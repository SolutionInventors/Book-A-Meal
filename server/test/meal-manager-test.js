
const mealManager = require('../utils/meal-manager'); 
const assert = require('chai').assert;

    
   


describe('mealManager tests', ()=> {
        
    describe('Managing meal functions', ()=> {
        describe('createMeal()', ()=> {
            describe('createMeal("Rice", 300) ', ()=> {
                let obj = mealManager.createMeal("Rice", 3000)
                it('should return an object', ()=> {
                    assert.isObject(obj); 
                }); 
                it('returned object should have an id' , ()=>{
                    assert.isNumber(obj.id); 
                }); 
                
            }); 
            describe('createMeal("Rice", undefined) should return false', ()=> {
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
                it("Get all meals should return an array", ()=> {
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
        describe('getNumberOfMeals() ', ()=> {
            it('getNumberOfMeals() should return a number', ()=> {
                assert.isNumber(mealManager.getNumberOfMeals()); 
            })
        })
    }); 
        
    describe('Meal management tests', ()=> {
            describe("updateMeal()",()=> {
                it(`updateMeal(1, "Beans", 300)  should return true`, ()=> {
                    let result = mealManager.updateMeal(0,"Beans", 300); 
                    assert.isTrue(result);  
                });
                it('updateMeal(undefined) should return undefined', ()=> {
                    assert.isUndefined(mealManager.updateMeal()); 
                })
            }); 
            describe("removeMeal()",()=>{
                it("removeMeal(1)", ()=> {
                    assert.isBoolean(mealManager.removeMeal(1));      
                }); 
                it('removeMeal(-1) should return undefined', ()=> {
                    assert.isUndefined(mealManager.removeMeal(-1));
                }); 
                it('removeMeal(0) should return true', ()=> {
                    assert.isTrue(mealManager.removeMeal(0)); 
                })
            });     
                
    }); 
    }); 

    describe('Menu functions', ()=>{
        let menu = mealManager.getTodayMenu(); 
        it('getTodayMenu() should return Object', ()=> {
            assert.isObject(menu); 
        }); 

    }); 
    describe('Order Functions', ()=>{
       
    }); 

    
    
   

}); 
