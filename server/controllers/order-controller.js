import orderService from '../services/order-service';
import customerService from '../services/customer-service';
import Order from '../models/Order';
import menuService from '../services/menu-service';

export default class OrderController {
  getTodayOrder(req, resp) {
    const { params: { id } } = req;

    const order = orderService.getById(id);
    if (order) {
      resp.status(200).json({
        success: true,
        order,
      });
    } else {
      resp.status(409).json({
        success: false,
        message: 'Specified id does not exist',
      });
    }
  }

  makeOrder(req, resp) {
    const { body: { customerId, orderIdArr } } = req;


    if (customerId && orderIdArr) {
      if (menuService.getMenu()) {
        const customer = customerService.getById(customerId);
        const orderArr = orderService.getOrderFromMenu(orderIdArr);
        const obj = new Order(orderArr, customer, new Date());
        const orderObj = orderService.makeOrder(obj);
        if (orderObj) {
          resp.status(201).json({
            success: true,
            orderObj,
          });
        } else {
          resp.status(404).json({
            success: false,
            message: 'The array passed as argument does not contain any valid menu item',
          });
        }
      }
      resp.status(412).json({
        success: false,
        message: 'Meal of today has not yet been created',
      });
    } else {
      resp.status(400).json({
        success: false,
        message: 'Some required data are missing',
      });
    }
    return undefined;
  }

  modify(req, resp) {
    const { body: { orderId, orderIdArr } } = req;
    const orderArr = orderService.getOrderFromMenu(orderIdArr);

    const createdObj = orderService.modify(orderId, orderArr);
    if (createdObj) {
      resp.status(201).json({
        succcess: true,
        createdObj,
      });
    } else {
      resp.status(400).json({
        success: false,
        message: 'Data inputed is invalid',
      });
    }
  }
  getAll(req, resp) {
    const orders = orderService.getAllOrders();
    resp.status(200).json({
      success: true,
      orders,
    });
  }
}
