import menuService from '../services/menu-service';
import Menu from '../models/Menu';

export default class MenuController {
  create(req, resp) {
    const { body: { mealsIdArr } } = req;

    const success = (menuObj) => {
      resp.status(201).json({
        success: true,
        createdObj: menuObj,
      });
    };

    const menuExists = () => {
      resp.status(409).json({
        success: false,
        message: 'The menu of today has already been created',
      });
    };

    const noValidId = () =>{
      resp.status(422).json({
        success: false,
        message: 'There was no valid mealId in your mealsIdArr',
      });
    };
    if (mealsIdArr) {
      const meals = menuService.getMealsFromArray(Array.from(mealsIdArr));

      let menuObj = new Menu(new Date(), meals);
      menuObj = menuService.createTodayMenu(menuObj);
      if (menuObj) {
        resp.status(201).json({
          success: true,
          createdObj: menuObj,
        });
      } else if (menuObj === false) {
        resp.status(409).json({
          success: false,
          message: 'The menu of today has already been created',
        });
      } else {
        resp.status(422).json({
          success: false,
          message: 'There was no valid mealId in your mealsIdArr',
        });
      }
    }
    resp.status(400).json({
      success: false,
      message: 'Some required fields are missing',
      missingData: ['mealsIdArr'],
    });
  }
  retrieveByDate(req, resp) {
    const date = new Date(req.date);
    const menu = menuService.getMenu(date.toDateString());
    if (date) {
      if (menu) {
        resp.status(200).json({
          success: true,
          menu,
        });
      } else {
        resp.status(404).json({
          success: false,
          message: 'The specified menu does not exists',
        });
      }
    } else {
      resp.status(400).json({
        success: true,
        message: 'You did not specify the date in your request',
        missingData: ['date'],
      });
    }
  }

  update(req, resp) {
    const { body: { mealsIdArr } } = req;
    if (mealsIdArr) {
      const meals = menuService.getMealsFromArray(mealsIdArr);

      let menuObj = new Menu(new Date(), meals);
      menuObj = menuService.updateTodayMenu(mealsIdArr);
      if (menuObj) {
        resp.status(201).json({
          success: true,
          createdObj: menuObj,
        });
      } else if (menuObj === false) {
        resp.status(409).json({
          success: false,
          message: 'The menu of today has not yet been created',
        });
      }
    } else {
      resp.status(400).json({
        success: false,
        message: 'Some required fields are missing',
        missingData: ['mealsIdArr'],
      });
    }
  }
}

