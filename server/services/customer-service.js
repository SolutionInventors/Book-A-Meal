import { v4 } from 'node-uuid';


class CustomerService {
  constructor() {
    this.customers = [];
  }

  registerCustomer(customer) {
    if (customer instanceof Customer && customer.canBeRegistered()) {
      customer.id = v4();
      this.customers.push(customer);
      return customer;
    }
  }

  getCustomer(username, password) {
    return this.customers.find(customer =>
      customer.username == username && customer.password == password);
  }

  getCustomerByName(name) {
    return this.customers.find(customer => customer.name == name);
  }
}

export default new CustomerService();
