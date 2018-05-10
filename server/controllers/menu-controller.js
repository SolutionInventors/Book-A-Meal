import menuService from '../services/menu-service';

export default class MenuController {
  create(req, resp) {
    const { body: { mealsIdArr } } = req;

    const success = (menuObj, meals) => {
      resp.status(201).json({
        success: true,
        data: {
          menuId: menuObj.id,
          dateCreated: menuObj.dateCreated,
          meals,
        },
      });
    };

    const menuExists = () => {
      resp.status(409).json({
        success: false,
        message: 'The menu of today has already been created',
      });
    };

    const noValidId = () => {
      resp.status(422).json({
        success: false,
        message: 'There was no valid mealId in your mealsIdArr',
      });
    };


    if (mealsIdArr) {
      menuService.createTodayMenu(mealsIdArr, success, noValidId, menuExists);
    } else {
      resp.status(400).json({
        success: false,
        message: 'Some required fields are missing',
        missingData: ['mealsIdArr'],
      });
    }
  }


  update(req, resp) {
    const { body: { mealsIdArr } } = req;
    if (mealsIdArr) {
      const errorHandler = (() => {
        resp.status(500).json({
          success: false,
          message: 'Error occured in server',
        });
      });
      const success = (menuObj, mealArr) => {
        const createdObj = {
          menuId: menuObj.id,
          meals: mealArr,
        };
        resp.status(201).json({
          success: true,
          createdObj,
        });
      };
      const noMenu = () => {
        resp.status(409).json({
          success: false,
          message: 'The menu of today has not yet been created',
        });
      };
      const noValidId = () => {
        resp.status(404).json({
          success: false,
          message: 'There was no valid mealId in your mealIdArr',
        });
      };

      menuService.updateTodayMenu(mealsIdArr, success, noMenu, noValidId, errorHandler);
    } else {
      resp.status(400).json({
        success: false,
        message: 'Some required fields are missing',
        missingData: ['mealsIdArr'],
      });
    }
  }

  retrieve(req, resp) {
    const success = (menu) => {
      resp.status(200).json({
        success: true,
        menu,
      });
    };
    const notFound = () => {
      resp.status(404).json({
        success: false,
        message: 'The specified menu of today has not yet been set',
      });
    };
    menuService.getMenu(success, notFound);
  }
}

