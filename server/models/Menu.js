
export default class Menu {
  constructor(date, meals) {
    this.meals = meals;
    if (date instanceof Date) {
      this.date = date.toDateString();
    }
  }

  isValid() {
    return Array.isArray(this.meals) && this.meals.length > 0 && this.date;
  }
}

