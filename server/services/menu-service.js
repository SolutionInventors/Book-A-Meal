import db from '../../models/index';

class MenuService {
  createTodayMenu(mealsIdArr, successCallBack, noValidId, alreadyCreated) {

    // db.Menu.findOrCreate( )
    db.Menu.findOne({
      where: { createdAt: new Date() },
    }).then((menu) => {
      if (menu) alreadyCreated();
      else {
        // const whereArr = mealsIdArr.map(id => ({ id }));
        db.Meal.findAll({
          where: { id: mealsIdArr },
        }).then((meals) => {
          if (!meals) noValidId();
          else {
            db.Menu.create({})
              .then((todayMenu) => {
                todayMenu.addMeals(meals)
                  .then(menuObj => successCallBack(menuObj));
              });
          }
        });
      }
    });
  }


  getMenu(callBack, menuNotSet, date = new Date()) {
    db.Menu.findOne({
      where: { createdAt: date },
      include: [{
        model: db.Meal,
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
    db.Menu.find({
      where: { createdAt: new Date() },
    }).then((menu) => {
      if (!menu) noMenuCallback();
      else {
        const whereArr = mealsIdArr.map(id => ({ id }));
        db.Meal.findAll({
          where: { $or: whereArr },
          attributes: ['id', 'name', 'image', 'amount'],
        }).then((mealArr) => {
          if (mealArr.length > 0) {
            db.MenuMeal.destroy({
              where: { menuId: menu.id },
            });

            mealArr.forEach((meal) => {
              db.MenuMeal.create({
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
    db.Menu.findOne({
      attributes: ['id', 'createdAt'],
      where: { createdAt: new Date() },
    }).then((menu) => {
      if (!menu) noMenuCallback();
      else {
        db.MenuMeal.findAll({
          where: { menuId: menu.id },
        }).then((menuMeals) => {
          const whereArr = menuMeals.map(menuMeal => menuMeal.mealId);
          db.Meal.findAll({
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

