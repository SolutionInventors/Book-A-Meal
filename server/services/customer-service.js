import { v4 } from 'node-uuid';
import User from '../models/User';

class CustomerService {
  constructor() {
    this.customers = [];
  }

  register(customer) {
    if (customer instanceof User && customer.canBeRegistered()) {
      customer.id = v4();
      this.customers.push(customer);
      return customer;
    }
    return undefined;
  }

  getCustomer(username, password) {
    return this.customers.find(customer =>
      customer.username == username && customer.password == password);
  }

  getCustomerByName(name) {
    return this.customers.find(customer => customer.name == name);
  }

  getById(customerId) {
    return this.customers.find(customer => customer.id == customerId);
  }

  getAll() {
    return this.customers;
  }

  exists(customerId) {
    return this.customers.findIndex(customer => customer.id == customerId) >= 0;
  }
}

export default new CustomerService();
