import menuService from './menu-service';
import Order from '../models/Order';
import { v4 } from 'node-uuid';

class OrderService {
  constructor() {
    this.orders = [];
  }

  makeOrder(orderObj) {
    if (orderObj instanceof Order) {
      console.log(orderObj.isValid(), '=========');
      orderObj.id = v4();
      this.orders.push(orderObj);
      return orderObj;
    }
    return undefined;
  }

  modify(orderId, orderObj) {
    const index = this.orders.findIndex(item => item.id == orderId);
    if (index >= 0) {
      this.orders[index].meals = orderObj.meals;
      return this.orders[index];
    }
    return undefined;
  }
  getOrdersByDate(date = new Date()) {
    return this.orders.filter(order => order.date == date.toDateString());
  }

  getAllOrdersEverMade() {
    return this.orders;
  }

  getById(id) {
    return this.orders.find(item => item.id == id);
  }

  getOrderFromMenu(mealsIdArr, customer) {
    const todayMenu = menuService.getMenu().meals;
    const meals =
      mealsIdArr
        .map(mealId =>
          todayMenu.find(mealObj =>
            mealObj.id == mealId))
        .filter(obj => obj);


    console.log(meals);
    return new Order(meals, customer, new Date());
  }
}

export default new OrderService();
