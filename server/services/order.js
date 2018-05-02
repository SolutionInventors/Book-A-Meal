const menuService = require('../services/menu'); 
const uuid = require('node-uuid') ; 

class OrderService{
    constructor(){
        this.orders = []; 
    }

    makeOrder(mealsIdArr, customer){
        if(Array.isArray(mealsIdArr) && customer){
            let todayMenu = menuService.getMenu().menu(); 
            let order = mealsIdArr.map((id)=> todayMenu.find((mealObj)=> 
                                id==mealObj.id )); 
            let orderObj = {
                order, 
                date: new Date().toDateString(), 
                customer:customer, 
                orderId: uuid.v4(), 
            };
            return orderObj; 
        }
       return false;
    }
    modify(orderId, ){

    }
    getAllOrders(){

    }
}

module.exports =  new OrderService(); 