const app = require('../app'); 
const assert = require('chai').assert; 
 
describe('App', function(){
    it('app should return hello', function(){
        assert.equal(app.sayHello(), 'hello'); 
    })
})