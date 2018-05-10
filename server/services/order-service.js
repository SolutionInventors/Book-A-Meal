import db from '../../models/index';

class OrderService {
  makeOrder(mealsIdArr, customerId, successCallBack, noValidId, noMenu) {
    db.Menu.findOne({
      where: { dateCreated: new Date().toDateString() },
      includes: [{
        model: db.Meal,
        through: 'menuId',
        as: 'meals',
        where: { id: mealsIdArr },
      }],
    }).then((todayMenu) => {
      if (todayMenu) {
        todayMenu.getMeals().then((meals) => {
          console.log(meals);
          if (meals.length > 0) {
            db.Order.create({
              customerId,
            }).then((order) => {
              order.addMeals(todayMenu.meals)
                .then(orderObj => successCallBack(orderObj));
            });
          } else {
            noValidId();
          }
        });

        successCallBack(todayMenu);
      } else {
        noMenu();
      }
    }).catch(error => noMenu(error));
  }

  getOrdersByDate(callback, date = new Date()) {
    db.Order.findAll({
      attributes: [['id', 'orderId']],
      include: [{
        model: db.Meal,
        through: 'orderId',
        as: 'meals',
      }],
      where: { dateCreated: date.toDateString() },
    }).then((orders) => {
      callback(orders);
    });
  }

//   getById(id) {
//     return this.orders.find(item => item.id == id);
//   }

//   getOrderFromMenu(mealsIdArr, customer) {
//     const todayMenu = menuService.getMenu().meals;
//     const meals =
//       mealsIdArr
//         .map(mealId =>
//           todayMenu.find(mealObj =>
//             mealObj.id == mealId))
//         .filter(obj => obj);


//     console.log(meals);
//     return new Order(meals, customer, new Date());
//   }
}

export default new OrderService();
