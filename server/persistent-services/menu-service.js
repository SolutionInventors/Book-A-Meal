import db from '../persistent/models/index';

class MenuService {
  createTodayMenu(mealsIdArr, successCallBack, noValidId, alreadyCreated) {
    db.Menu.find({
      where: { createdAt: new Date().toDateString() },
    }.then((menu) => {
      if (menu) alreadyCreated();
      else {
        const mealArr =
            mealsIdArr.map(id => db.Meal.findById(id))
              .filter(obj => obj);

        if (mealArr.length > 0) {
          db.Menu.create({})
            .then((todayMenu) => {
              mealArr.forEach((meal) => {
                db.MenuMeal.create({
                  menuId: todayMenu.id,
                  mealId: meal.id,
                });
              });
              successCallBack(todayMenu, mealArr);
            });
        } else {
          noValidId();
        }
      }
    }));
  }


  getMenu(callBack, dateStr = new Date().toDateString()) {
    db.Menu.find({
      where: { createdAt: dateStr },
    }).then((menu) => {
      db.MenuMeal.findAll({
        where: { menuId: menu.id },
      }).then((mealsInMenu) => {
        callBack(menu, mealsInMenu);
      });
    });
  }


  updateTodayMenu(mealsIdArr, callBack) {
    const mealArr =
    mealsIdArr.map(id => db.Meal.findById(id))
      .filter(obj => obj);

    db.Menu.find({
      where: { reatedAt: new Date().toDateString() },
    }).then((menu) => {
      db.MenuMeal.destroy({
        where: { menuId: menu.id },
      });

      mealArr.forEach((meal) => {
        db.MenuMeal.create({
          menuId: menu.id,
          mealId: meal.id,
        });
      });
      callBack(menu);
    });
  }
}


export default new MenuService();

