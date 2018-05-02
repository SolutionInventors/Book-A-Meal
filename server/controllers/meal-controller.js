const mealService = require('../services/meal-service'); 
const Meal = require('../models/Meal'); 

class MealController{
    constructor(router){
        this.router = router; 
        this.registerRoutes(); 
    }

    registerRoutes(){
        this.router.get('/meals', this.getAll.bind(this)); 
        this.router.get('/meals/:id', this.getById.bind(this));
        this.router.post('/meals/', this.create.bind(this)); 
        this.router.put('/meals/:id', this.modify.bind(this));
        this.router.delete('/meals/:id', this.delete.bind(this));
    }

    getAll(req, resp){
        let meals = mealService.getAllMeals(); 
        resp.status(200).json(meals);
    }

    getById(req, resp){
        let id = req.params.id;
         
        let meal = mealService.getById(id); 
        if(id){
            if(meal){
                resp.status(200).json({
                    success: true, 
                    meal, 
                }); 
            }else{
                resp.status(404).json({
                    success:false, 
                    message: 'The inputed id does not exist', 
                })
            }
        }

        resp.status(400).json({
            success: false, 
            message:'Missing id', 
        }); 
    }

    create(req, resp){
        let {name, amount, image} = req.body; 
        if(name&& amount && image){
            let mealObj = new Meal(name, amount, image); 
            mealObj =  mealService.createMeal(mealObj); 
            if(mealObj){
                resp.status(201).json({
                    success: true, 
                    message:'Meal was created successfully', 
                    createdObj: mealObj,
                });
            }else if(mealObj ===false){
                resp.status(409).json({
                    success:false, 
                    message:'The specified meal name already exists', 
                });
            }else{
                resp.status(500).status({
                    success:false, 
                    message:'Server failed to process your request', 
                });
            }
        }else{
            resp.status(400).json({
                success: false, 
                message:'Some required data is missing in the body', 
            }); 
        }
    }

    delete(req, resp){
        let id = req.params.id; 
        if(id){
            let deletedObj = mealService.delete(id); 
            if(deletedObj){
                resp.status(201).json({
                    success: true, 
                    deletedObj, 
                }); 
            }else{
                resp.status(404).json({
                    success:false, 
                    message:'There is no meal with the specified id', 
                });
            }
        }else{
            resp.status(400).json({
                success: false, 
                message:'No meal id was specified', 
            });
        }
        
    }

    modify(req, resp){
        let id = req.params.id; 
        if(id){
            let newMealObj = new Meal(req.mealName, req.amount, req.image); 
            let createdObj = mealService.update(id, newMealObj); 
            if(creaatedObj){
                resp.status(201).json({
                    success:true, 
                    createdObj, 
                });
            }else{
                resp.status(404).json({
                    success:false, 
                    message:'The id you specified does not exist'
                })
            }
        }else{
            resp.status(400).json({
                success:false, 
                message:'Meal id is missing', 
            })
        }
    }
}

module.exports = MealController; 
