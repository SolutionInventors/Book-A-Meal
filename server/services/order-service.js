import menuService from './menu-service';
import Order from '../models/Order';
import { v4 } from 'node-uuid';

class OrderService {
  constructor() {
    this.orders = [];
  }

  makeOrder(orderObj) {
    if (orderObj.isValid()) {
      orderObj.id = v4();
      this.orders.push(orderObj);
      return orderObj;
    }
    return false;
  }

  modify(orderId, orderObj) {
    const index = this.orders.findIndex(item => item.id == orderObj.id);
    if (orderId >= 0 && orderObj.isValid()) {
      this.orders[index] = orderObj;
      return orderObj;
    }
    return undefined;
  }
  getOrdersByDate(date = new Date()) {
    return this.orders.filter(order => order.date == date.toDateString());
  }

  getAllOrders() {
    return this.orders;
  }

  getById(id) {
    return this.orders.find(item => item.id == id);
  }

  static getOrderFromMealIdArr(mealsIdArr, customer) {
    const todayMenu = menuService.getMenu().menu();
    const order = mealsIdArr.map(id => todayMenu.find(mealObj =>
      id === mealObj.id));

    return new Order(order, customer, new Date());
  }
}

export default new OrderService();
