import { v4 } from 'node-uuid';
import Caterer from '../models/Caterer';

class CatererService {
  constructor() {
    this.caterers = [];
  }

  registerCaterer(caterer) {
    if (caterer instanceof Caterer) {
      caterer.id = v4();
      this.caterers.push(caterer);
      return caterer;
    }
    return undefined;
  }

  getCaterer(username, password) {
    return this.caterers.find(caterer =>
      caterer.username === username && caterer.password === password);
  }

  getcatererByName(name) {
    return this.caterers.find(caterer => caterer.name === name);
  }
}
export default new CatererService();
