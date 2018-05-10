import database from '../../models/index';

class OrderService {
  makeOrder(mealsIdArr, customerId, successCallBack, noValidId, noMenu, erroCallback) {
    database.Menu.findOne({
      where: { dateCreated: new Date().toDateString() },
      includes: [{
        model: database.Meal,
        through: 'menuId',
        as: 'meals',
        where: { id: mealsIdArr },
      }],
    }).then((todayMenu) => {
      if (todayMenu) {
        todayMenu.getMeals().then((meals) => {
          if (meals.length > 0) {
            database.Order.create({
              customerId,
            }).then((order) => {
              order.addMeals(meals)
                .then(() => successCallBack(order, meals));
            });
          } else {
            noValidId();
          }
        });

        successCallBack(todayMenu);
      } else {
        noMenu();
      }
    }).catch(error => erroCallback(error));
  }

  getOrdersByDate(callback, errorCallback, date = new Date()) {
    database.Order.findAll({
      attributes: [['id', 'orderId']],
      include: [{
        model: database.Meal,
        through: 'orderId',
        as: 'meals',
      }],
      where: { dateCreated: date.toDateString() },
    }).then((orders) => {
      callback(orders);
    }).catch(error => errorCallback(error));
  }

  getById(id, callback, errorHandler) {
    database.Order.findOne({
      where: { id },
    }).then(order => callback(order))
      .catch(error => errorHandler(error));
  }

  modify(orderId, mealsIdArr, callback, errorCallback) {
    database.Meals.findOne({
      where: { id: mealsIdArr },
      includes: [{
        model: database.Menu,
        through: 'mealId',
        as: 'menus',
        where: { dateCreated: new Date().toDateString() },
        attributes: [],
      }],
    })
      .then((meals) => {
        if (meals.length > 0) {
          database.Order.findOne({
            where: { id: orderId },
          }).then((order) => {
            order.setMeals(meals);
            callback(order, meals);
          });
        } else {
          callback();
        }
      }).catch(error => errorCallback(error));
  }
}

export default new OrderService();
