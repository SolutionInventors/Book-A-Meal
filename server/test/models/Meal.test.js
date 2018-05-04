
const Meal = require('../../models/Meal'); 
const assert = require('chai').assert; 


describe('meal', ()=> {
    let amount = 'amount' ; 
    let name = 'chi'; 
    let image = 'image1'; 
    let id = 'id1';
    let meal = new Meal(name,  amount, image); 


    it('expects created value to be an object', ()=>{
        assert.isObject(meal); 
        
    })

    it('expects created value to be a subclass of meal', ()=>{
        assert.isTrue(meal instanceof Meal); 
    });


    it('expects created value to be a  to have an amount attribute ', ()=>{
        assert.isDefined(meal.amount); 
    });

    it('expects created value to be a  to have an name attribute ', ()=>{
        assert.isDefined(meal.name); 
    });

    it('expects created value to be a  to have an image attribute ', ()=>{
        assert.isDefined(meal.image); 
    });


    it(`expects created value of amount to be ${amount}`, ()=>{
        assert.isTrue(meal.amount  == amount); 
    }); 

    it(`expects created value of amount to be ${name}`, ()=>{
        assert.isTrue(meal.name  == name); 
    }); 
    it(`expects created value of amount to be ${image}`, ()=>{
        assert.isTrue(meal.image  == image); 
    }); 

    it(`expects Id value to be set to id1`, ()=>{
        assert.isDefined(meal.id(id)); 
    }); 

    it(`expects created value of amount to be ${id}`, ()=>{
        assert.isTrue(meal.id  == id); 
    }); 
    it(`expects boolean value`, ()=>{
        assert.isDefined(meal.isValid()); 
    }); 
   

})
