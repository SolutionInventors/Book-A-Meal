import { getMenu } from "../services/menu"; 
import Order from "../models/Order"; 
import { v4 } from "node-uuid"; 

class OrderService{
    constructor(){
        this.orders = []; 
    }

    makeOrder(orderObj){
        if(orderObj.isValid()){
            orderObj.id = v4(); 
            this.orders.push(orderObj); 
            return orderObj; 
        }
        return false;
    }

    modify(orderId, orderObj){
        let index = this.orders.findIndex((item)=> item.id == orderId); 
        if(orderId >= 0 && orderObj.isValid()){
            orderObj.id = orderId; 
            this.orders[index]= orderObj; 
        }
    }
    getOrdersByDate(date= new Date()){
        return this.orders.filter((order)=> order.date == date.toDateString()); 
    }

    getAllOrders(){
        return this.orders; 
    }

    static getOrderFromMealIdArr(mealsIdArr, customer){
        let todayMenu = getMenu().menu(); 
        let order = mealsIdArr.map((id)=> todayMenu.find((mealObj)=> 
                            id==mealObj.id )); 

        return new Order(order, customer, new Date()); 
    }
}

export default new OrderService(); 