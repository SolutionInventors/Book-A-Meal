import db from '../persistent/models/index';

class OrderService {
  makeOrder(mealsIdArr, customerId, successCallBack, noValidId, noMenu) {
    db.Menu.findOne({
      attributes: ['id'],
      where: { createdAt: new Date() },
    }).then((todayMenu) => {
      if (!todayMenu) noMenu();
      else {
        const mealsWhere = mealsIdArr.map(id => ({ mealId: id }));
        db.MenuMeal.findAll({
          attributes: ['mealId'],
          where: { menuId: todayMenu.id, $or: mealsWhere },
        }).then((mealsInMenu) => {
          if (mealsInMenu.length > 0) {
            db.Order.create({
              menuId: todayMenu.id,
              customerId,
            }).then((order) => {
              mealsInMenu.forEach((meal) => {
                db.OrderMeal.create({
                  mealId: meal.id,
                  orderId: order.id,
                }).then();
              });
              db.Meal.findAll({
                where: { id: mealsInMenu },
              }).then((meals) => {
                const orderObj = {
                  orderId: order.id,
                  meals,
                };
                successCallBack(orderObj);
              });
            });
          } else {
            noValidId();
          }
        });
      }
    });
  }

  getOrdersByDate(callback, date = new Date()) {
    db.Order.findAll({
      attributes: [['id', 'orderId']],
      where: { createdAt: date },
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
