import mealService from '../services/mealService';

export default class MealController {
  getAll(req, resp) {
    const { user } = req.authData;
    if (!user.caterer) {
      resp.status(401).json({
        success: false,
        message: 'Only Caterers are permitted here',
      });
      return;
    }
    const limit = req.body.limit ? req.body.limit : 100;
    const serverErrorCallback = () => {
      resp.status(500).json({
        success: false,
        message: 'An unknown error occured in the server',
      });
    };
    mealService.getAll(limit, (meals) => {
      if (meals.length > 0) {
        resp.json({
          success: true,
          meals,
        });
      } else {
        resp.status(204).json({
          success: true,
          message: 'There are no available meals in the database',
        });
      }
    }, serverErrorCallback);
  }
  getById(req, resp) {
    const { user } = req.authData;
    if (!user.caterer) {
      resp.status(409).json({
        success: false,
        message: 'Only Caterers are permitted here',
      });
      return;
    }
    const { params: { id } } = req;
    const successfunc = (meal) => {
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
    };


    if (id) {
      const serverErrorCallback = () => {
        resp.status(500).json({
          success: false,
          message: 'An unknown error occured in the server',
        });
      };
      mealService.getById(id, successfunc, serverErrorCallback);
    } else {
      resp.status(400).json({
        success: false,
        message: 'Missing id',
      });
    }
  }

  create(req, resp) {
    const { user } = req.authData;
    if (!user.caterer) {
      resp.status(409).json({
        success: false,
        message: 'Only Caterers are permitted here',
      });
      return;
    }
    const {
      name, amount, image, description,
    } = req.body;
    if (name && amount && image) {
      const mealObj = {
        name,
        amount,
        image,
        description,
      };

      const errorCallback = (error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          resp.status(409).json({
            success: false,
            message: 'The meal name is already in the database',
          });
        } else {
          resp.status(500).json({
            success: false,
            message: 'An unknown error occured while processing your request',
          });
        }
      };

      const success = (meal) => {
        resp.status(201).json({
          success: true,
          data: meal,
        });
      };
      if (Number.isNaN(+name) && Number.isFinite(+amount)) {
        mealService.create(mealObj, success, errorCallback);
      } else {
        resp.status(404).json({
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
    const { user } = req.authData;
    if (!user.caterer) {
      resp.status(409).json({
        success: false,
        message: 'Only Caterers are permitted here',
      });
      return;
    }
    const { params: { id } } = req;
    if (id) {
      const success = (deletedItems) => {
        if (deletedItems > 0) {
          resp.status(200).json({
            success: true,
            message: 'Meal was deleted successfully',
          });
        } else {
          resp.status(404).json({
            success: false,
            message: 'The mealId specified was not found',
          });
        }
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
    const { user } = req.authData;
    if (!user.caterer) {
      resp.status(409).json({
        success: false,
        message: 'Only Caterers are permitted here',
      });
      return;
    }
    const { name, amount, image } = req.body;
    const { params: { id } } = req;
    if (name && amount && image) {
      if (id) {
        const newMealObj = { name, amount, image };
        const success = (updatedMeal) => {
          console.log(updatedMeal);
          if (updatedMeal) {
            resp.status(201).json({
              success: true,
              data: updatedMeal,
            });
          } else {
            resp.status(404).json({
              success: false,
              message: 'The id you specified does not exist',
            });
          }
        };
        const serverErrorCallback = (err) => {
          if (err.name === 'SequelizeDatabaseError') {
            resp.status(500).json({
              success: false,
              message: 'The id you specified is not a UUID',
            });
          } else if (err.name === 'SequelizeUniqueConstraintError') {
            resp.status(409).json({
              success: false,
              message: 'The meal name is already in the database',
            });
          } else {
            resp.status(500).json({
              success: false,
              message: 'An unknown error occured while processing your request',
            });
          }
        };
        mealService.modify(id, newMealObj, success, serverErrorCallback);
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
