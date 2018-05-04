import menuService from '../services/menu-service';
import Menu from '../models/Menu';


export default class MenuController {
  retrieve(req, resp) {
    const menu = menuService.getMenu();
    if (menu) {
      resp.status(200).json({
        success: true,
        menu,
      });
    } else {
      resp.status(412).json({
        success: false,
        message: 'The menu of today has not yet been set',
      });
    }
  }

  create(req, resp) {
    const { body: { mealsIdArr } } = req;
    console.log(mealsIdArr);
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
      }
    }
    resp.status(400).json({
      success: false,
      message: 'Some required fields are missing',
    });
  }
  retrieveByDate(req, resp) {
    const date = new Date(req.date);
    const menu = menuService.getMenu(date.toDateString());
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
    }
    resp.status(400).json({
      success: false,
      message: 'Some required fields are missing',
    });
  }
}

