
const Menu = require('../../models/Menu'); 
const assert = require('chai').assert; 

describe('meun', ()=> {
    let menuitem = ['item1','fh'] ; 
    let date = 'chi'; 
  
    let menu = new Menu(menuitem,  date); 

    it('expects creted value to be an object', ()=>{
        assert.isObject(menu); 
        
    });

    it('expects creted value to be a subclass of menu', ()=>{
        assert.isTrue(menu instanceof Menu); 
    });


    it('expects creted value to be a  to have an date attribute ', ()=>{
        assert.isDefined(menu.date); 
    });

    it('expects creted value to be a  to have an MENU attribute ', ()=>{
        assert.isDefined(menu.menu); 
    });

    it('expects  value to be a string', ()=>{
        assert.typeOf(menu.date,'string'); 
    });

    it('expects to return id ', ()=>{
        assert.isDefined(menu.id); 
    });

    it('expects creted value to be a  boolean ', ()=>{
        assert.isDefined(menu.isValid); 
    });


})