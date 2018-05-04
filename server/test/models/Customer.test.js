
const Customer = require('../../models/Customer'); 
const assert = require('chai').assert; 


describe('Cusomter', ()=> {
    let email = 'email' ; 
    let name = 'chi'; 
    let pass = 'password'; 
    let customer = new Customer(name,  email, pass); 


    it('expects creted value to be an object', ()=>{
        assert.isObject(customer); 
        
    })

    it('expects creted value to be a subclass of Customer', ()=>{
        assert.isTrue(customer instanceof Customer); 
    });


    it('expects creted value to be a  to have an email attribute ', ()=>{
        assert.isDefined(customer.email); 
    });

    it('expects creted value to be a  to have an name attribute ', ()=>{
        assert.isDefined(customer.name); 
    });

    it('expects creted value to be a  to have an password attribute ', ()=>{
        assert.isDefined(customer.password); 
    });


    it(`expects creted value of email to be ${email}`, ()=>{
        assert.isTrue(customer.email  == email); 
    }); 

    it(`expects creted value of email to be ${name}`, ()=>{
        assert.isTrue(customer.name  == name); 
    }); 
    it(`expects creted value of email to be ${pass}`, ()=>{
        assert.isTrue(customer.password  == pass); 
    }); 
    it(`expects can be register to return some values `, ()=>{
        assert.isTrue(customer.canBeRegistered()); 
    }); 




})
