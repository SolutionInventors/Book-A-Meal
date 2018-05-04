import menuService from './menu-service';
import Order from '../models/Order';
import { v4 } from 'node-uuid';

class OrderService {
  constructor() {
    this.orders = [];
  }

  makeOrder(orderObj) {
    orderObj.id = v4();
    this.orders.push(orderObj);
    return orderObj;
  }

  modify(orderId, orderArr) {
    const index = this.orders.findIndex(item => item.id == orderId);
    if (orderId >= 0) {
      this.orders[index].order = orderArr;
      return this.orders[index];
    }
    return undefined;
  }
  getOrdersByDate(date = new Date()) {
    return this.orders.filter(order => order.date == date.toDateString());
  }

  getAllOrders(date = new Date()) {
    return this.orders.filter(order => order.date == date.toDateString());
  }

  getById(id) {
    return this.orders.find(item => item.id == id);
  }

  getOrderFromMenu(mealsIdArr, customer) {
    const todayMenu = menuService.getMenu().menu;
    const order =
      mealsIdArr
        .map(id =>
          todayMenu.find(mealObj =>
            mealObj.id == id))
        .filter(obj => obj);

    console.log(order);
    return new Order(order, customer, new Date());
  }
}

export default new OrderService();
