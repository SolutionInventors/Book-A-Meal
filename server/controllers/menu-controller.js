const menuService = require('../services/menu-service'); 
const Menu = require('../models/Menu'); 


class MenuController{
    constructor(router){
        this.router = router; 
        this.registerRoutes(); 
    }

    registerRoutes(){
        this.router.get('/menu/', this.retrieve.bind(this)); 
        this.router.post('/menu/', this.create.bind(this));
        this.router.put('/menu/', this.update.bind(this));
    }

    retrieve(req, resp){
        let menu = menuService.getMenu(); 
        if(menu){
           resp.status(200).json({
               success:true, 
               menu, 
           }); 
        }else{
            resp.status(412).json({
                success:true, 
                message:'The menu of today has not yet been set', 
            });
        }

    }

    create(req, resp){
        let {mealsIdArr}= req; 
        if(mealsIdArr){
            let meals = menuService.getMealsFromArray(mealIdArr); 

            let menuObj = new Menu(new Date(), meals); 
            menuObj = menuService.createTodayMenu(menuObj); 
            if(menuObj){
                resp.status(201).json({
                    success: true, 
                    createdObj: menuObj, 
                });
            }else if(menuObj=== false){
                resp.status(409).json({
                    success: false, 
                    message:'The menu of today has already been created', 
                });
            }
        }
        resp.status(400).json({
            success:false, 
            message:'Some required fields are missing', 
        });
        
    }
    retrieveByDate(req, resp){
        let date = new Date(req.date); 
        let menu = menuService.getMenu(date.toDateString()); 
        if(menu){
            resp.status(200).json({
                success:true, 
                menu, 
            }); 
        }else{
            resp.status(404).json({
                success:false, 
                message:'The specified menu does not exists', 
            });
        }

    }

    update(req, resp){
        let {mealsIdArr}= req; 
        if(mealsIdArr){
            let meals = menuService.getMealsFromArray(mealIdArr); 

            let menuObj = new Menu(new Date(), meals); 
            menuObj = menuService.updateTodayMenu(mealsIdArr);    
            if(menuObj){
                resp.status(201).json({
                    success: true, 
                    createdObj: menuObj, 
                });
            }else if(menuObj=== false){
                resp.status(409).json({
                    success: false, 
                    message:'The menu of today has already been created', 
                });
            }
        }
        resp.status(400).json({
            success:false, 
            message:'Some required fields are missing', 
        });
        
    }
}

module.exports = MenuController; 
