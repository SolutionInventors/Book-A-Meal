const mealManager = require('../utils/meal-manager');

function create(req, resp){
    let {mealName, amount} = req.body; 
    
    if(mealName  && amount){
        if(mealManager.getMealByName(mealName)){
                resp.status(409).send({
                    error: {message: 'The meal option you want to create already exists'}
                }); 
            }else if(obj = mealManager.createMeal(mealName, amount)){
                resp.status(201).send(obj); 
            }else{
                resp.status(404).send({
                    error: {message: 'Meal does not exist'}, 
                });   
            }
        }else{
            resp.sendStatus(400); 
        }
}

function modify(req, resp){
    let mealId = req.params.mealId;
    let mealName = req.query.mealName; 
    let amount = req.query.amount; 
    if(  mealName && amount){
        let newObj = mealManager.updateMeal(+mealId, mealName, amount); 
        if(newObj){
            resp.status(201).send(newObj); 
        }else{
            resp.status(404).send({
                message: 'Id was not found',
            }); 
            
        }
    }else{
        resp.status(400); 
    }
}

function remove(req, resp){
    let mealId = req.params.mealId;
    if(mealManager.removeMeal(+mealId)){
                resp.status(200).send({ message: `Successful deleted mealId = ${mealId} `}); 
        }else{
            resp.status(404).send({error:
                { message: 'The specified id was not found'}
            }); 
    }
}

function retrieveAll(req, resp){
    let meals = mealManager.getAllMeals(); 
    resp.status(401).json(meals); 
}

module.exports ={
    create, 
    modify, 
    remove, 
    getMealByName, 
    getAllMeals
}