
const mealManager = require('../utils/meal-manager'); 
const assert = require('chai').assert;

    



describe('mealManager tests', ()=> {
    let mealId = mealManager.createMeal("Rice", 3000).id;
    let mealObj = mealManager.createMeal("Pepper Soup", 3000); 
    describe('Managing meal functions', ()=> {
        describe('createMeal()', ()=> {
            describe('createMeal("Pepper Soup", 300) ', ()=> {
               
                it('should return an object', ()=> {
                    assert.isObject(mealObj); 
                }); 
                it('returned object should have an id' , ()=>{
                    assert.isNumber(mealObj.id); 
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
                        }); 
                        it('getMeal() should return undefined ', ()=> {
                            assert.isUndefined(getMeal()); 
                        })
                }); 
                describe('getNumberOfMeals() ', ()=> {
                    it('getNumberOfMeals() should return a number', ()=> {
                        assert.isNumber(mealManager.getNumberOfMeals()); 
                    });
                });

                describe('Menu Management functions', ()=> {
                    describe('Create Today Menu', ()=> {
                        let menu =   mealManager.createTodayMenu([mealId]); 
                        it('createTodayMenu() should return menu object', ()=> {
                            assert.isObject(menu); 
                        });
                        it('returned object should be have an id', ()=> {
                            assert.isDefined(menu)
                        });
                    }); 
                    describe('getTodayMenu()', ()=> {
                        let obj = mealManager.getTodayMenu(); 
                        it('returned object should be defined', ()=> {
                            assert.isObject(obj); 
                        }); 
                        it('returned object have a date', ()=> {
                            assert.isDefined(obj.date); 
                        }); 
                    }); 
    
                    describe('updateTodayMenu(mealIdArr)', ()=> {
                        let obj = mealManager.updateTodayMenu([mealId]); 
                        it(`updateTodayMenu([${mealId}])returned value should be an object`, ()=>{
                            assert.isObject(obj); 
                        }); 
                        it(`updateTodayMenu(undefined) should return undfined`, ()=> {
                            assert.isUndefined(mealManager.updateTodayMenu()); 
                        }); 
                    }); 
    
                    describe('Order Functions', ()=>{
                        let dateStr = new Date().toDateString(); 
                        it('getOrderByDate(undefined, userObj) returns undefined', ()=> {
                            assert.isUndefined(mealManager.getOrderByDate(undefined, dateStr)); 
                        }); 
                        it('expecting undefined from  getOrderByDate(customer, undefined', ()=> {
                            assert.isUndefined(mealManager.getOrderByDate(customer, undefined)); 
                        } )
    
                        it('expecting object from  getOrderByDate(customer, dateStr)', ()=> {
                            assert.isObject(mealManager.getOrderByDate(customer, dateStr)); 
                        } ); 
                        describe('makeOrder()', ()=> {
                            it('should return an object', ()=> {
                                assert.isObject(mealManager.makeOrder([0], customer)); 
                            })
    
                             it('should return an object', ()=> {
                                assert.isObject(mealManager.makeOrder([0], customer));
                            })
                            it('makeOrder([]) should return an undefined', ()=> {
                                assert.isUndefined(mealManager.makeOrder([], customer));
                            })
                            it('makeOrder([0], undefined) should return an undefined', ()=> {
                                assert.isUndefined(mealManager.makeOrder([0], customer));
                            }); 
    
                        })
                        
                        
                    }); 
                })
            });
           
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

    
   

    
    
   

}); 
