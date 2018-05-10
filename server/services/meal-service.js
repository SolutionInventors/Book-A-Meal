import db from '../../models/index';

class MealService {
  create(mealObj, successCallBack, onError) {
    db.Meal.create(mealObj)
      .then(meal =>
        successCallBack({
          id: meal.id,
          name: meal.name,
          amount: meal.amount,
          image: meal.image,
          createdAt: meal.createdAt,
        }))
      .catch(error => onError(error));
  }

  getAll(limit, callback, errorCallback) {
    db.Meal.findAll({ limit }).then((meals) => {
      callback(meals);
    }).catch(error => errorCallback(error));
  }

  getById(id, callback, errorCallback) {
    db.Meal.findOne({ where: { id } })
      .then((meal) => {
        callback(meal);
      })
      .catch(error => errorCallback(error));
  }

  delete(id, callback, errorCallback) {
    db.Meal.destroy({ where: { id } })
      .then(deletedRows => callback(deletedRows))
      .catch(error => errorCallback(error));
  }


  modify(id, newMeal, successCallBack, errorCallback) {
    db.Meal.update(newMeal, {
      where: { id },
      returning: true,
    })
      .then(([updatedRows, [updatedMeal]]) => {
        successCallBack(updatedMeal, updatedRows);
      })
      .catch(err => errorCallback(err));
  }
}

export default new MealService();
