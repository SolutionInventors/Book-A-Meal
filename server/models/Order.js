import User from '../models/User';

class Order {
  constructor(orderArr, customer, date) {
    this.order = orderArr;
    if (customer instanceof User) {
      this.customer = customer;
      delete this.customer.password;
    }
    if (date instanceof Date) this.date = date.toDateString();
  }

  isValid() {
    return this.date && Array.isArray(this.order) &&
                this.order.length > 0 && this.customer;
  }
}

export default Order;
