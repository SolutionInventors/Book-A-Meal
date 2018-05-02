
class Order{
    constructor(orderArr,customer, date ){
        this.order = orderArr; 
        if(customer instanceof Customer) this.customer = customer; 
        if(date instanceof Date) this.date = date.toDateString(); 
    }

    get order(){
        return this.order; 
    }

    get customer(){
        return this.customer; 
    }

    set date(date){
        if(date instanceof Date) this.date = date.toDateString(); 
    }

    get date(){
        return this.date;  
    }

    set id(id){
        this.id = id; 
    }
    
    get id(){
        return this.id; 
    }
    isValid(){
        return this.date == date && Array.isArray(this.order) && 
                this.order.length> 0 && this.customer; 
    }
}

module.exports = Order; 