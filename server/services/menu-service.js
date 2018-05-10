import database from '../../models/index';

class MenuService {
  createTodayMenu(mealsIdArr, successCallBack, noValidId, alreadyCreated) {
    database.Meal.findAll({
      where: { id: mealsIdArr },
    }).then((meals) => {
      if (meals && meals.length > 0) {
        database.Menu.create({ dateCreated: new Date().toDateString() })
          .then(todayMenu =>
            todayMenu.addMeals(meals)
              .then(menuObj => successCallBack(todayMenu, menuObj)))
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
          attributes: ['id', 'name'],
        },
        as: 'meals',
      }],
    }).then((menu) => {
      if (menu) callBack(menu);
      else {
        menuNotSet();
      }
    });
  }


  updateTodayMenu(mealsIdArr, callBack, noMenuCallback, noValidId) {
    database.Menu.findOne({
      where: { dateCreated: new Date().toDateString() },
    }).then((menu) => {
      if (!menu) noMenuCallback();
      else {
        const whereArr = mealsIdArr.map(id => ({ id }));
        const menuId = menu.id;
        database.Menu.create({
          id: menuId,
        }).then((newMenu) => {
          menu.addMeals(newMenu);
        });
        database.Meal.findAll({
          where: { $or: whereArr },
          attributes: ['id', 'name', 'image', 'amount'],
        }).then((mealArr) => {
          if (mealArr.length > 0) {
            database.MenuMeal.destroy({
              where: { menuId: menu.id },
            });

            mealArr.forEach((meal) => {
              database.MenuMeal.create({
                menuId: menu.id,
                mealId: meal.id,
              });
            });
            callBack(menu, mealArr);
          } else {
            noValidId();
          }
        });
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

