const User = require('./User'); 

class Customer extends User{
    constructor(name, email , password){
        super(name, email, password); 
    }

    canBeRegistered(){
        return this.name && this.email && this.password;
    }
}

module.exports = Customer; 