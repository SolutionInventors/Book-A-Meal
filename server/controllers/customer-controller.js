import Customer from '../models/Customer';
import customerService from '../services/customer-service';

export default class CustomerController {
  login(req, resp) {
    const { username, password } = req.body;

    if (username && password) {
      const caterer = customerService.getCustomer(username, password);
      if (caterer) {
        resp.status(200).json({
          success: true,
          caterer,
        });
      } else {
        resp.status(404).json({
          success: false,
          message: 'Wrong username and password',
        });
      }
    } else {
      resp.status(400).json({
        success: false,
        message: 'Some required arguments are missing',
      });
    }
  }

  register(req, resp) {
    const { username, password, email } = req.body;
    let customer = new Customer(username, email, password);
    customer = customerService.registerCustomer(customer);
    if (customer) {
      resp.status(201).json({
        success: true,
        createdObj: customer,
      });
    } else if (customer === false) {
      resp.status(409).json({
        success: false,
        message: 'The specified username or mail exists',
      });
    }
  }
}
