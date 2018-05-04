import User from '../models/User';

class Order {
  constructor(meals, customer, date) {
    this.meals = meals;
    if (customer instanceof User) {
      this.customer = customer;
      delete this.customer.password;
    }
    if (date instanceof Date) this.date = date.toDateString();
  }

  isValid() {
    return this.date && Array.isArray(this.meals) &&
                this.meals.length > 0 && this.customer;
  }
}

export default Order;
