import orderService from '../services/order-service';
import customerService from '../services/customer-service';
import menuService from '../services/menu-service';

export default class OrderController {
  getTodayOrders(req, resp) {
    const orders = orderService.getOrdersByDate();
    if (orders) {
      resp.status(200).json({
        success: true,
        orders,
      });
    }
  }

  makeOrder(req, resp) {
    const { body: { customerId, mealsIdArr } } = req;


    if (customerId && mealsIdArr) {
      if (menuService.getMenu()) {
        const customer = customerService.getById(customerId);
        const orderObj = orderService.getOrderFromMenu(mealsIdArr, customer);
        const newOrder = orderService.makeOrder(orderObj);
        if (newOrder) {
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
    const orderObj = orderService.getOrderFromMenu(req.body.mealsIdArr);

    const createdObj = orderService.modify(req.params.id, orderObj);
    console.log('Enterered!!!');
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
