module.exports =function(){
    const customerService = require('../services/customer-service'); 
    const Customer = require('../models/Customer'); 

    for(let i =0; i< 50; i++){
        
        customerService.registerCustomer() ;
    }
}