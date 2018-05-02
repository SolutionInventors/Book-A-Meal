const uuid = require('node-uuid'); 


class CustomerService{
    constructor(){
        this.customers = []; 
    }

    registerCustomer(customer){
        if(customer instanceof Customer){
            customer.id = uuid.v4(); 
            this.customers.push(customer); 
            return customer; 
        }
    }

    getCustomer(customerId){
        return this.customers.find((customer)=> customer.id == customerId); 
    }

    getCustomerByName(name){
        return this.customers.find((customer)=> customer.name == name); 
    }
}

module.exports = new CustomerService();