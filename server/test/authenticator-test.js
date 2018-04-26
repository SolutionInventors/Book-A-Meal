// 

const authenticator = require('../utils/authenticator'); 
const assert = require('chai').assert; 


describe('Customer management', ()=> {
        
    let customer = {
        username: 'chidiebrer', 
        password: 'password', 
        userType: 'customer', 
        email: 'email', 
    }
    describe('Adding new user', ()=> {
        let token = authenticator.createToken(customer,'customer' );
        describe(`createToken(${customer}')`,()=> {
            let badObj = authenticator.createToken(customer); 

            it( 'should return an undefined', ()=> {
                assert.isUndefined(token); 
            }); 

            it(`should not be an object`, ()=> {
            assert.isNotObject(badObj); 
            }); 
            describe(`getUser(${customer.username}, 'customer')`, ()=> {
                let temp = authenticator.getUser(customer.username, 'customer'); 

                it( 'should return an object', ()=> {
                    assert.isObject(temp); 
                });     
                it('returned object should have a username property', ()=> {
                    assert.isDefined(temp.username); 
                }); 
                it('returned object should have an email property', ()=> {
                    assert.isDefined(temp.email); 
                }); 
                it('returned object should have a password property', ()=> {
                    assert.isDefined(temp.password); 
                });
                it('returned object should have a userType property', ()=> {
                    assert.isDefined(temp.userType); 
                });  
                it(`exists(${temp}, 'customer') should return true`, ()=> {
                    assert.isTrue(authenticator.exists(temp, 'customer')); 
                }); 
                it(`exists(${temp}, undefined) should return false`, ()=> {
                    assert.isFalse(authenticator.exists(temp)); 
                }); 
                
            }); 
            
        } ) ;


        describe(`createToken(${customer}, \'customer\')`,()=> {
            it( 'should return an object', ()=> {
                assert.isObject(token); 
            }); 

            it(`returned object should contain a token property`, ()=> {
                assert.isDefined(token.token); 
            }); 
        } ); 

    });
}); 


describe('Caterer management', ()=> {
        
    let caterer = {
        username: 'chidiebrer', 
        password: 'password', 
        userType: 'caterer', 
        email: 'email', 
    }
    describe('Adding new user', ()=> {
        let token = authenticator.createToken(caterer,'caterer' );
        describe(`createToken(${caterer}')`,()=> {
            let badObj = authenticator.createToken(caterer); 

            it( 'should return an undefined', ()=> {
                assert.isUndefined(token); 
            }); 

            it(`should not be an object`, ()=> {
            assert.isNotObject(badObj); 
            }); 
            describe(`getUser(${caterer.username}, 'caterer')`, ()=> {
                let temp = authenticator.getUser(caterer.username, 'caterer'); 

                it( 'should return an object', ()=> {
                    assert.isObject(temp); 
                });     
                it('returned object should have a username property', ()=> {
                    assert.isDefined(temp.username); 
                }); 
                it('returned object should have an email property', ()=> {
                    assert.isDefined(temp.email); 
                }); 
                it('returned object should have a password property', ()=> {
                    assert.isDefined(temp.password); 
                });
                it('returned object should have a userType property', ()=> {
                    assert.isDefined(temp.userType); 
                });  
                it(`exists(${temp}, 'customer') should return true`, ()=> {
                    assert.isTrue(authenticator.exists(temp, 'caterer')); 
                }); 
                
            }); 

            describe('changePassword(username, \'customer\')', ()=> {
                it(`changePassword(${caterer.username},\'shell\',  'caterer') should return true`, ()=> {
                    assert.isTrue(authenticator.changePassword(caterer.username, 'shell', 'caterer'))
                }); 
                it(`changePassword(${caterer.username},undefined, 'caterer') should return false`, ()=> {
                    assert.isFalse(authenticator.changePassword(caterer.username, undefined, 'caterer')); 
                }); 
            }); 

            
        } ) ;


        describe(`createToken(${caterer}, \'caterer\')`,()=> {
            it( 'should return an object', ()=> {
                assert.isObject(token); 
            }); 

            it(`returned object should contain a token property`, ()=> {
                assert.isDefined(token); 
            }); 
            let req = {
                headers: {authorization: `Bearer ${token}`}, 
            }; 
            let resp= {
                status(){
                    return {
                        send: ()=>{assert.isTrue(false)}
                    } 
                }
            }
            it('Verification of token should pass', ()=> {
                authenticator.verify(req, resp,()=> assert.isTrue(true) ); 
            }); 

            
        } ); 

    });
}); 
