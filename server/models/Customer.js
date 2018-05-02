const User = require('./User'); 

class Customer extends User{
    constructor(name, email , password){
        super(name, email, password); 
    }
}

module.exports = Customer; 