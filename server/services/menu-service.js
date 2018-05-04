import mealService from '../services/meal-service';
import { v4 } from 'node-uuid';
import Menu from '../models/Menu';

class MenuService {
  constructor() {
    this.menu = [];
  }

  createTodayMenu(menuObj) {
    if (menuObj && menuObj instanceof Menu) {
      menuObj.date = new Date().toDateString();
      if (this.exists(menuObj)) {
        return false;
      } else if (menuObj.isValid()) {
        menuObj.id = v4();
        this.menu.push(menuObj);
        return menuObj;
      }
    }
    return undefined;
  }

  exists(menuObj) {
    return !!this.menu.find(obj => menuObj.date == obj.date);
  }
  getMenu(dateStr = new Date().toDateString()) {
    return this.menu.find(item => item.date == dateStr);
  }

  updateTodayMenu(mealIdArr) {
    const menu = this.getMealsFromArray(mealIdArr);
    const date = new Date();
    const index = this.menu.findIndex(item => item.dateStr == date.toDateString());

    if (index >= 0 && menu.length >= 0) {
      const menuObj = new Menu(new Date(), menu);

      this.menu[index] = menuObj;
      return menuObj;
    }
    return false;
  }
  getMealsFromArray(mealIdArr) {
    return mealIdArr.map(id => mealService.getById(id))
      .filter(item => item);
  }
}

export default new MenuService();

