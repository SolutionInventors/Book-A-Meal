import {default as mealService} from '../services/meals';
import dummyMeals from '../dumbData/dummyMeals'; 
import {assert} from 'chai'; 

dummyMeals();
let meals= mealService.geAllMeals(); 
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
        assert.isUndefined(mealsService.getMealById()); 
    }); 
}); 

describe('getMealByName()', ()=> {
    it(`exp getMealByName(${meals[0].name}) should return an object`, ()=> {
        assert.isObject( mealService. getMealById(meals[0].name));
    }); 
    it('expecting getMealByName(undefined) to return undefined', ()=> {
        assert.isUndefined(mealsService.getMealByName()); 
    }); 
}); 

describe('createMeal()', ()=> {
    let meal = mealsService.createMeal('Jollof Rice', 2000, 'image.jpg'); 
    
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
            assert.isFalse(mealsService.createMeal()); 
        }); 
    }); 
  
});


describe('updateMeal() ',  ()=> {
    describe('updateMeal  with two arguments', ()=> {
        describe(`update(${meals[0].id}, mealName, amount, image`, ()=> {
       
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
                assert.isFalse(mealsService.updateMeal(-1, "Egg"));
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

