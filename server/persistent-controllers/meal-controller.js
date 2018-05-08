import mealService from '../services/meal-service';
import Meal from '../models/Meal';
import db from '../persistent/models/index';


function createHelper(resp, mealObj) {
  const { name } = mealObj;
  db.Meal.findOne({ where: { name } })
    .then((foundObj) => {
      if (foundObj) {
        resp.status(409).json({
          success: false,
          message: 'The meal name is already in the database',
        });
      } else {
        db.Meal.create(mealObj).then((meal) => {
          resp.status(201).json({
            success: true,
            createdObj: meal,
          });
        });
      }
    });
}

export default class MealController {
  getAll(req, resp) {
    const limit = req.body.limit ? req.body.limit : 100;
    db.Meal.findAll({ limit }).then((meals) => {
      resp.status(200).json(meals);
    });
  }

  getById(req, resp) {
    const { params: { id } } = req;

    if (id) {
      db.Meal.findOne({ where: { id } })
        .then((meal) => {
          if (meal) {
            resp.status(200).json({
              success: true,
              meal,
            });
          } else {
            resp.status(404).json({
              success: false,
              message: 'The inputed id does not exist',
            });
          }
        });
    } else {
      resp.status(400).json({
        success: false,
        message: 'Missing id',
      });
    }
  }

  create(req, resp) {
    const { name, amount, image } = req.body;
    if (name && amount && image) {
      const mealObj = new Meal(name, amount, image);
      if (mealObj.isValid()) {
        createHelper(resp, mealObj);
      } else {
        resp.status(422).json({
          success: false,
          message: 'The format of the inputed values is invalid. Ensure that amount is a number and name is a valid string',
        });
      }
    } else {
      const missingData = [];
      if (!name) missingData.push('name');
      if (!amount) missingData.push('amount');
      if (!image) missingData.push('image');
      resp.status(400).json({
        success: false,
        message: 'Some required data is missing in the body',
        missingData,
      });
    }
  }


  delete(req, resp) {
    const { params: { id } } = req;
    if (id) {
      const deletedObj = mealService.delete(id);

      db.Meal.destroy({where: { id }})
        .then((deletedRows) => {
          if(deletedObj){
            resp.status()
          }
        })
      if (deletedObj) {
        resp.status(201).json({
          success: true,
          deletedObj,
        });
      } else {
        resp.status(404).json({
          success: false,
          message: 'There is no meal with the specified id',
        });
      }
    } else {
      resp.status(400).json({
        success: false,
        message: 'No meal id was specified',
        missingData: ['id'],
      });
    }
  }

  modify(req, resp) {
    const { name, amount, image } = req.body;
    const { params: { id } } = req;
    if (name && amount && image) {
      if (id) {
        const newMealObj = new Meal(name, amount, image);
        const createdObj = mealService.update(id, newMealObj);
        if (createdObj) {
          resp.status(201).json({
            success: true,
            createdObj,
          });
        } else {
          resp.status(404).json({
            success: false,
            message: 'The id you specified does not exist',
          });
        }
      } else {
        resp.status(400).json({
          success: false,
          message: 'Meal id is missing',
        });
      }
    } else {
      const missingData = [];
      if (!name) {
        missingData.push('name');
      } else if (!amount) {
        missingData.push('amount');
      } else if (!image) {
        missingData.push('image');
      }
      resp.status(400).json({
        success: true,
        message: 'Some required data are missing',
        missingData,
      });
    }
  }
}
