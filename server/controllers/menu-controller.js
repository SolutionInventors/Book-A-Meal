import { getMenu, getMealsFromArray, createTodayMenu, updateTodayMenu } from "../services/menu-service"; 
import Menu from "../models/Menu"; 


export default class MenuController{
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
        let menu = getMenu(); 
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
            let meals = getMealsFromArray(mealIdArr); 

            let menuObj = new Menu(new Date(), meals); 
            menuObj = createTodayMenu(menuObj); 
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
        let menu = getMenu(date.toDateString()); 
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
            let meals = getMealsFromArray(mealIdArr); 

            let menuObj = new Menu(new Date(), meals); 
            menuObj = updateTodayMenu(mealsIdArr);    
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
};

