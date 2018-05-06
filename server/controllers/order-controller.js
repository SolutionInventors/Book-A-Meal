import orderService from '../services/order-service';
import customerService from '../services/customer-service';
import menuService from '../services/menu-service';

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
      if (customerService.exists(customerId)) {
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
        } else {
          resp.status(412).json({
            success: false,
            message: 'Menu of today has not yet been created',
          });
        }
      } else {
        resp.status(422).json({
          success: false,
          message: 'The customerId specified was not found',
        });
      }
    } else {
      const missingData = [];
      if (!customerId) missingData.push('customerId');
      if (!mealsIdArr) missingData.push('mealsIdArr');
      resp.status(400).json({
        success: false,
        message: 'Some required data are missing',
        missingData,
      });
    }
  }

  modify(req, resp) {
    const { params: { id }, body: { mealsIdArr } } = req;

    if (id && mealsIdArr) {
      console.log(mealsIdArr);
      console.log(id);
      if (menuService.getMenu()) {
        const orderObj = orderService.getOrderFromMenu(mealsIdArr);
        const createdObj = orderService.modify(id, orderObj);
        if (Array.isArray(orderObj.meals) && orderObj.meals.length > 0) {
          if (createdObj) {
            resp.status(201).json({
              succcess: true,
              createdObj,
            });
          } else {
            resp.status(404).json({
              success: false,
              message: 'The specified orderId was not found',
            });
          }
        } else {
          resp.status(422).json({
            success: false,
            message: 'No mealsId in the mealsIdArr was not found in today\'s menu',
          });
        }
      } else {
        resp.status(412).json({
          message: 'The menu of today has not yet been set',
        });
      }
    } else {
      const missingData = [];
      if (!id) missingData.push('id');
      if (mealsIdArr) missingData.push('mealsIdArr');
    }
  }
  getAll(req, resp) {
    const orders = orderService.getAllOrdersEverMade();
    resp.status(200).json({
      success: true,
      orders,
    });
  }

  noRoute(req, resp) {
    resp.status(404).json({
      success: false,
      message: 'An invalid route was specified',
    });
  }
}
