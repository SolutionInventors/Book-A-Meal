
class Meal {
  constructor(name, amount, image) {
    this.name = name.trim();
    this.amount = +amount;
    this.image = image.trim();
  }

  isValid() {
    return this.name && this.name.length > 0 && !Number.isNaN(this.amount) && this.image &&
            this.image.length > 0;
  }
}

export default Meal;
