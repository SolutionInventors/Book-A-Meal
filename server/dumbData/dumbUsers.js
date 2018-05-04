import catererService from '../services/caterer-service';
import customerService from '../services/customer-service';
import User from '../models/User';

export default function () {
  catererService.registerCaterer(new User('Chidieberer', 'chidi@email.com', 'pass'));
  catererService.registerCaterer(new User('Edu', 'edu@email.com', 'pass'));
  catererService.registerCaterer(new User('Somto', 'somto@email.com', 'pass'));
  catererService.registerCaterer(new User('David', 'dave@email.com', 'pass'));

  customerService.register(new User('Admin', 'chidi@email.com', 'pass'));
  customerService.register(new User('Caterer', 'edu@email.com', 'pass'));
  customerService.register(new User('Caterer Chi', 'somto@email.com', 'pass'));
  customerService.register(new User('Dave Caterer', 'dave@email.com', 'pass'));
}
