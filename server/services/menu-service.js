import database from '../../models/index';

class MenuService {
  createTodayMenu(mealsIdArr, successCallBack, noValidId, alreadyCreated) {
    database.Meal.findAll({
      where: { id: mealsIdArr },
      attributes: ['id', 'amount', 'name', 'image'],
    }).then((meals) => {
      if (meals && meals.length > 0) {
        database.Menu.create({ dateCreated: new Date().toDateString() })
          .then(todayMenu =>
            todayMenu.addMeals(meals)
              .then(() => successCallBack(todayMenu, meals)))
          .catch(error => alreadyCreated(error));
      } else {
        noValidId();
      }
    });
  }


  getMenu(callBack, menuNotSet, date = new Date()) {
    database.Menu.findOne({
      where: { dateCreated: date.toDateString() },
      include: [{
        model: database.Meal,
        through: {
          foreignKey: 'mealId',
          attributes: [],
        },
        attributes: ['id', 'amount', 'name', 'image'],
        as: 'meals',
      }],
    }).then((menu) => {
      if (menu) callBack(menu);
      else {
        menuNotSet();
      }
    });
  }


  updateTodayMenu(mealsIdArr, callback, noMenuCallback, noValidId, errorHandler) {
    database.Meal.findAll({
      where: { id: mealsIdArr },
      attributes: ['id', 'amount', 'name', 'image'],
    }).then((meals) => {
      if (meals.length > 0) {
        database.Menu.findOne({
          where: { dateCreated: new Date().toDateString() },
        }).then((todayMenu) => {
          if (todayMenu) {
            todayMenu.setMeals(meals)
              .then(() => {
                callback(todayMenu, meals);
              });
          } else {
            noValidId();
          }
        }).catch(error => errorHandler(error));
      } else {
        noValidId();
      }
    });
  }

  retrieve(callback, noMenuCallback) {
    database.Menu.findOne({
      attributes: ['id', 'createdAt'],
      where: { createdAt: new Date() },
      include: [{
        model: database.Meal,
        through: {
          foreignKey: 'mealId',
          attributes: ['id', 'name'],
        },
        as: 'meals',
      }],
    }).then((menu) => {
      if (!menu) noMenuCallback();
      else {
        database.MenuMeal.findAll({
          where: { menuId: menu.id },
        }).then((menuMeals) => {
          const whereArr = menuMeals.map(menuMeal => menuMeal.mealId);
          database.Meal.findAll({
            where: { mealId: whereArr },
            attributes: ['id', 'name', 'amount', 'image'],
          }).then((meals) => {
            callback(menu, meals);
          });
        });
      }
    });
  }
}
export default new MenuService();

