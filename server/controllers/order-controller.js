import orderService from '../services/order-service';

export default class OrderController {
  getOrder(req, resp) {
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
    resp.status(200).json({
      alive: true,
    });
  }

  getAl(req, resp) {
    const orders = orderService.getAllOrders();

    resp.status(200).json({
      success: true,
      orders,
    });
  }
}
