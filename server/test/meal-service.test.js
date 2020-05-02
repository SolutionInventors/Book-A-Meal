const assert =  require("chai").assert; 
const mealService =require('../services/meals.js') ; 
const dummyMeals = require("../dumbData/dummyMeals.js")



dummyMeals();
let meals= mealService.getAllMeals(); 
describe('getAllMeals()', ()=> {
    it('expected to return an array', ()=> {
        assert.isArray(meals); 
    }); 
    it('expected getAllMeals(obj) to return array', ()=> {
        assert.isArray(mealService.getAllMeals({})); 
    });
}); 

describe('getMealById() ', ()=> {
    it(`exp getMealById(${meals[0].id}) should return an object`, ()=> {
        assert.isObject( mealService. getMealById(meals[0].id));
    }); 
    it('expecting getMealById(undefined) to return undefined', ()=> {
        assert.isUndefined(mealService.getMealById()); 
    }); 
}); 

describe('getMealByName()', ()=> {
    it(`exp getMealByName(${meals[0].name}) should return an object`, ()=> {
        assert.isObject( mealService. getMealById(meals[0].name));
    }); 
    it('expecting getMealByName(undefined) to return undefined', ()=> {
        assert.isUndefined(mealService.getMealByName()); 
    }); 
}); 

describe('createMeal()', ()=> {
    let meal = mealService.createMeal('Jollof Rice', 2000, 'image.jpg'); 
    
    describe(`createMeal('Jollof Rice', 2000, 'image.jpg)'`, ()=> {
        it('expecting createMeal to return an object', ()=> {
            assert.isObject(meal); 
        }); 
    
        it('epecting meal to return to have an id', ()=> {
            assert.isDefined(meal.id); 
           
        }); 
        it('returned object should have a name attribute', ()=> {
            assert.isDefined(meal.name);
        }); 
    
        it('epecting meal to return to have an iamge', ()=> {
            assert.isDefined(meal.image); 
           
        }); 
        it('returned object should have an amount attribute', ()=> {
            assert.isDefined(meal.amount);
        }); 
    
    }); 
   
    describe('createMeal(undefined)', ()=> {
        it('should return false', ()=> {
            assert.isFalse(mealService.createMeal()); 
        }); 
    }); 
  
});


describe('updateMeal() ',  ()=> {
    describe('updateMeal  with two arguments', ()=> {
        describe(`update(${meals[0].id}, 'Tomato')`, ()=> {
       
            let mealObj = mealService.update(meals[0].id, "Tomato"); 
    
            it('returned value should be an object', ()=> {
                assert.isObject(mealObj); 
            }); 
    
            it(`returned object should have an id of ${meals[0].id}`, ()=> {
                assert.isTrue(mealObj.id == meals[0].id); 
            });
    
            it(`returned object should have a name attribute`, ()=> {
                assert.isDefined(mealObj.name); 
            });
            it('returned object should have  an amount attribute', ()=> {
                assert.isDefined(mealObj.amount)
            });
        }); 
        
        describe('updateMeal(-1,"Tomato" ) ', ()=> {
            it('should return false', ()=> {
                assert.isFalse(mealService.updateMeal(-1, "Egg"));
            });
        });
    
    });
        describe(`update(${meals[1].id}, mealName, amount, image`, ()=> {
        let mealObj = mealService.update(meals[1].id, "Tomato",3000); 

        it('returned value should be an object', ()=> {
            assert.isObject(mealObj); 
        }); 

        it(`returned object should have an id of ${meals[0].id}`, ()=> {
            assert.isTrue(mealObj.id == meals[1].id); 
        });

        it(`returned object should have a name attribute`, ()=> {
            assert.isDefined(mealObj.name); 
        });
        it('returned object should have  an amount attribute', ()=> {
            assert.isDefined(mealObj.amount)
        });
    }); 
});

