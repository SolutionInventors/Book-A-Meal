const Order = require('../../models/Order'); 
const assert = require('chai').assert; 

describe('meun', ()=> {
    let orderarr = ['item1','fh'] ; 
    let customer = 'customer1';
    let date = 'chi'; 
    
  
    let order = new Order(orderarr,customer, date); 
    describe('vqlue of instanciation', ()=> {
        it('expects created value to be an object', ()=>{
            assert.isObject(order); 
            
        });
            
        it('expects created value to be a subclass of order', ()=>{
            assert.isTrue(order instanceof Order); 
        });
    })  

    it('expects created value to be a  to have an date attribute ', ()=>{
        assert.isDefined(order.date); 
    });

    it('expects created value to be a  to have an order attribute ', ()=>{
        assert.isDefined(order.order); 
    });

    it('expects  value to be a string', ()=>{
        assert.typeOf(order.date,'string'); 
    });
    

    it('expects to return id ', ()=>{
        assert.isDefined(order.id); 
    });

    it('expects created value to be a  boolean ', ()=>{
        assert.isDefined(order.isValid); 
    });

    it('expects created value to be a  boolean ', ()=>{
        assert.isTrue(order.isValid); 
    });

    
    it(`expects creted value of order to be ${orderarr}`, ()=>{
        assert.isTrue(order.order  == orderarr); 
    }); 

    it(`expects creted value of customer to be ${customer}`, ()=>{
        assert.isTrue(order.customer  == customer); 
    }); 
    it(`expects creted value of date to be ${date}`, ()=>{
        assert.isTrue(order.date  == date); 
    }); 



})