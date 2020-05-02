const User = require('./User'); 

class Caterer extends User{
    constructor(name, email , password){
        super(name, email, password); 
    }
}

module.exports = Caterer; 