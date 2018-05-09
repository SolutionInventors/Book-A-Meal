import db from '../../models/index';

class MealService {
  create(mealObj, alreadyExistCallback, successCallBack) {
    const { name } = mealObj;
    db.Meal.findOne({ where: { name } })
      .then((foundObj) => {
        if (foundObj) {
          alreadyExistCallback();
        } else {
          db.Meal.create(mealObj).then((meal) => {
            successCallBack({
              id: meal.id,
              name: meal.name,
              amount: meal.amount,
              image: meal.image,
              createdAt: meal.createdAt,
            });
          });
        }
      });
  }

  getAll(limit, callback) {
    db.Meal.findAll({ limit }).then((meals) => {
      callback(meals);
    });
  }

  getById(id, foundCallback, notFoundCallback) {
    db.Meal.findOne({ where: { id } })
      .then((meal) => {
        if (meal) {
          foundCallback(meal);
        } else {
          notFoundCallback();
        }
      });
  }

  delete(id, successCallBack, notFoundCallback) {
    db.Meal.destroy({ where: { id } })
      .then((deletedRows) => {
        if (deletedRows) {
          successCallBack(deletedRows);
        } else {
          notFoundCallback();
        }
      });
  }


  modify(id, newMeal, successCallBack, notFoundCallback) {
    db.Meal.find({
      where: { id },
    })
      .then((meal) => {
        if (meal) {
          meal.update(newMeal)
            .then(updatedMeal => successCallBack(updatedMeal));
        } else {
          notFoundCallback();
        }
      });
  }
}

export default new MealService();
