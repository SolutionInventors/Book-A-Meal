import { getMealById } from '../services/meal-service';
import { v4 } from 'node-uuid';
import Menu from '../models/Menu';

class MenuService {
  constructor() {
    this.menu = [];
  }

  createTodayMenu(menuObj) {
    if (menuObj && menuObj instanceof Menu) {
      menuObj.date = new Date();
      if (exists(menuObj)) {
        return false;
      } else if (menuObj.isValid()) {
        menuObj.id = v4();
        this.menu.push(menuObj);
        return menuObj;
      }
    }
  }

  static exists(menuObj) {
    return !!this.menu.find(obj => menuObj.name == obj.name);
  }
  getMenu(dateStr = new Date().toDateString()) {
    return this.menu.find(item => item.date == dateStr);
  }

  updateTodayMenu(mealIdArr) {
    const menu = getMealsFromArray(mealIdArr);
    const index = this.menu.findIndex(item => item.dateStr == dateStr);
    if (index >= 0 && menu) {
      const dateStr = new Date().toDateString();
      const newObj = {
        menu: menuArr,
        date: todayStr,
        id: v4(),
      };
      this.menu[index] = newObj;
      return newObj;
    }
  }
  static getMealsFromArray(mealIdArr) {
    return mealIdArr.map(id => getMealById(id))
      .filter(item => item);
  }
}

export default new MenuService();

