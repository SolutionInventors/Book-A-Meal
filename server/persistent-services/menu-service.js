import db from '../persistent/models/index';

class MenuService {
  createTodayMenu(mealsIdArr, successCallBack, noValidId, alreadyCreated) {
    db.Menu.find({ // find menu of today
      where: { createdAt: new Date() },
    }).then((menu) => {
      if (menu) alreadyCreated();

      else {
        const whereArr = mealsIdArr.map(id => ({ id }));
        db.Meal.findAll({
          where: { $or: whereArr },
          attributes: ['id', 'name', 'image', 'amount'],
        }).then((mealArr) => {
          if (mealArr.length > 0) { // no id in the mealsIdArr was found
            db.Menu.create({})
              .then((todayMenu) => {
                mealArr.forEach((meal) => {
                  db.MenuMeal.create({
                    menuId: todayMenu.id,
                    mealId: meal.id,
                  });
                });
                const menuObj = {
                  menuId: todayMenu.id,
                  meals: mealArr,
                };
                successCallBack(menuObj);
              });
          } else {
            noValidId();
          }
        });
      }
      return undefined;
    });
  }


  getMenu(callBack, menuNotSet, date = new Date()) {
    db.Menu.findOne({
      where: { createdAt: date },
    }).then((menu) => {
      if (menu) {
        db.MenuMeal.findAll({
          attributes: ['menuId', 'mealId'],
          where: { menuId: menu.id },
        }).then((menuMeals) => {
          const whereArr = menuMeals.map(obj => ({ id: obj.mealId }));
          db.Meal.findAll({
            where: whereArr,
          }).then((meals) => {
            const todayMenu = {
              menuId: menu.id,
              meals,
            };
            callBack(todayMenu);
          });
        });
      } else {
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

