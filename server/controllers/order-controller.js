import orderService from '../services/order-service';

export default class OrderController {
  getTodayOrders(req, resp) {
    const errorCallback = (() => {
      resp.status(500).json({
        success: false,
        message: 'An error occured while processing your request',
      });
    });

    const success = (orders) => {
      if (orders) {
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
    };
    orderService.getOrdersByDate(success, errorCallback);
  }

  makeOrder(req, resp) {
    const { body: { customerId, mealsIdArr } } = req;

    if (customerId && mealsIdArr) {
      const success = (order, meals) => {
        console.log(meals);
        const orderObj = {
          order,
          meals,
        };
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

      const errorCallback = (err) => {
        console.log(err);
        resp.status(500).json({
          success: false,
          message: 'An unknown error occured while processing your request',
        });
      };
      orderService.makeOrder(mealsIdArr, customerId, success, notValid, noMenu, errorCallback);
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

  modify(req, resp) {
    const { body: { orderId, mealsIdArr } } = req;

    if (mealsIdArr) {
      const success = (order, meals) => {
        if (meals && order) {
          console.log(meals);
          const orderObj = {
            order,
            meals,
          };
          resp.status(201).json({
            success: true,
            orderObj,
          });
        } else if (order === false) {
          resp.status(404).json({
            success: false,
            message: 'The orderId you specified does not exist',
          });
        } else {
          resp.status(400).json({
            success: false,
            message: 'No valid id was found in your mealsIdArr',
          });
        }
      };

      const errorCallback = (() => {
        resp.status(500).json({
          success: false,
          message: 'An error occured while processing your request',
        });
      });
      orderService.modify(orderId, mealsIdArr, success, errorCallback);
    }
  }
}
