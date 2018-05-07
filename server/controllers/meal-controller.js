import mealService from '../services/meal-service';
import Meal from '../models/Meal';

export default class MealController {
  getAll(req, resp) {
    const meals = mealService.getAllMeals();
    resp.status(200).json({
      succes: true,
      meals,
    });
  }

  getById(req, resp) {
    const { params } = req;

    const meal = mealService.getById(params.id);
    if (params.id) {
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
    }

    resp.status(400).json({
      success: false,
      message: 'Missing id',
    });
  }


  create(req, resp) {
    const { name, amount, image } = req.body;
    if (name && amount && image) {
      let mealObj = new Meal(name, amount, image);
      if (mealObj.isValid()) {
        mealObj = mealService.createMeal(mealObj);
        if (mealObj) {
          resp.status(201).json({
            success: true,
            message: 'Meal was created successfully',
            createdObj: mealObj,
          });
        } else if (mealObj === false) {
          resp.status(409).json({
            success: false,
            message: 'The specified meal name already exists',
          });
        } else {
          resp.status(500).status({
            success: false,
            message: 'Server failed to process your request',
          });
        }
      } else {
        resp.status(422).json({
          success: false,
          message: 'Check that name, amount and image are provided in your request',
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

