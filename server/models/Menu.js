
class Menu {
  constructor(date, menu) {
    this.menu = menu;
    if (date instanceof Date) {
      this.date = date.toDateString();
    }
  }

  isValid() {
    return Array.isArray(this.menu) && this.menu.length > 0 && this.date;
  }
}

export default Menu;
