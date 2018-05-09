import mealService from '../services/meal-service';

export default class MealController {
  getAll(req, resp) {
    const limit = req.body.limit ? req.body.limit : 100;
    mealService.getAll(limit, meals => resp.json({
      success: true,
      meals,
    }));
  }

  getById(req, resp) {
    const { params: { id } } = req;
    const successfunc = (meal) => {
      resp.status(200).json({
        success: true,
        meal,
      });
    };
    const failedCallback = () => {
      resp.status(404).json({
        success: false,
        message: 'The inputed id does not exist',
      });
    };

    if (id) {
      mealService.getById(id, successfunc, failedCallback);
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
      const mealObj = { name, amount, image };

      const existsCallback = () => {
        resp.status(409).json({
          success: false,
          message: 'The meal name is already in the database',
        });
      };

      const success = (meal) => {
        resp.status(201).json({
          success: true,
          createdObj: meal,
        });
      };

      if (mealObj.isValid()) {
        mealService.create(mealObj, existsCallback, success);
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
      const success = (deletedObj) => {
        resp.status(200).json({
          success: true,
          deletedObj,
        });
      };
      const notFound = () => {
        resp.status(404).json({
          success: false,
          message: 'There is no meal with the specified id',
        });
      };
      mealService.delete(id, success, notFound);
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
        const newMealObj = { name, amount, image };
        const success = (createdObj) => {
          resp.status(201).json({
            success: true,
            createdObj,
          });
        };

        const notFound = () => {
          resp.status(404).json({
            success: false,
            message: 'The id you specified does not exist',
          });
        };

        mealService.modify(id, newMealObj, success, notFound);
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

