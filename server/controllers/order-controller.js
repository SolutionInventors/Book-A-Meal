import orderService from '../services/order-service';

export default class OrderController {
  getTodayOrders(req, resp) {
    const orders = orderService.getOrdersByDate();
    if (orders.length > 0) {
      resp.status(200).json({
        success: true,
        orders,
      });
    } else {
      resp.status(204).json({
        success: true,
        message: 'No orders have been made today',
      });
    }
  }

  makeOrder(req, resp) {
    const { body: { customerId, mealsIdArr } } = req;

    if (customerId && mealsIdArr) {
      const success = (orderObj) => {
        resp.status(201).json({
          success: true,
          orderObj,
        });
      };
      const notValid = () => {
        resp.status(404).json({
          success: false,
          message: 'No meal id you specified was found in today\'s menu',
        });
      };
      const noMenu = () => {
        resp.status(412).json({
          success: false,
          message: 'The meal of today has not yet been set',
        });
      };
      orderService.makeOrder(mealsIdArr, customerId, success, notValid, noMenu);
    } else {
      resp.status(400).json({
        success: false,
        messge: 'Some required fields are missing in body',
      });
    }
  }

  noRoute(req, resp) {
    resp.status(404).json({
      success: false,
      message: 'An invalid route was specified',
    });
  }
}
