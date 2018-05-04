import Customer from '../models/Customer';

class Order {
  constructor(orderArr, customer, date) {
    this.order = orderArr;
    if (customer instanceof Customer) this.customer = customer;
    if (date instanceof Date) this.date = date.toDateString();
  }

  isValid() {
    return this.date && Array.isArray(this.order) &&
                this.order.length > 0 && this.customer;
  }
}

export default Order;
