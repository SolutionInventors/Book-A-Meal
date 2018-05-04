
const Caterer = require('../../models/Caterer'); 
const assert = require('chai').assert; 


describe('caterer', ()=> {
    let email = 'email' ; 
    let name = 'chi'; 
    let pass = 'password'; 
    let caterer = new Caterer(name,  email, pass); 


    it('expects creted value to be an object', ()=>{
        assert.isObject(caterer); 
        
    })

    it('expects creted value to be a subclass of caterer', ()=>{
        assert.isTrue(caterer instanceof Caterer); 
    });


    it('expects creted value to be a  to have an email attribute ', ()=>{
        assert.isDefined(caterer.email); 
    });

    it('expects creted value to be a  to have an name attribute ', ()=>{
        assert.isDefined(caterer.name); 
    });

    it('expects creted value to be a  to have an password attribute ', ()=>{
        assert.isDefined(caterer.password); 
    });


    it(`expects creted value of email to be ${email}`, ()=>{
        assert.isTrue(caterer.email  == email); 
    }); 

    it(`expects creted value of email to be ${name}`, ()=>{
        assert.isTrue(caterer.name  == name); 
    }); 
    it(`expects creted value of email to be ${pass}`, ()=>{
        assert.isTrue(caterer.password  == pass); 
    }); 



})
