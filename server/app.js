const express = require('express'); 
const app = express(); 
const mealManager = require('./utils/meal-manager'); 
const bodyParser = require('body-parser'); 
const jwt = require('jsonwebtoken'); 

 app.use(bodyParser.urlencoded({
     extended:true, 
    }
)); 
app.use(bodyParser.json()); 

app.listen(3333, 'localhost', (error)=>{
    if(error){s
        console.log('Error in setting up server'); 
    }else{
        console.log('Server was set up successfully at port 3333'); 
    }
}); 

app.post('/login', (req, resp)=> {

}); 

app.get('/meals/', (req, resp)=> {
    let meals = mealManager.getAllMeals(); 
    resp.status(200).json(meals)
}); 

app.post('/meals/',  (req, resp)=> {
    
    let mealName =  req.body.mealName;
    let amount =  req.body.amount; 
    let obj;
    if(req.body && mealName  && amount){
       if(mealManager.getMealByName(mealName)){
           
            resp.status(409).send({
                error: {message: "The meal option you want to create already exists"}
            }); 

        }else if(obj = mealManager.createMeal(mealName, amount)){
            resp.status(201).send({
                message:"Successfully created",
                objCreated:  obj,
            }); 
        }else{
            resp.send('Failed');   
        }
    }else{
        resp.sendStatus(400); 
    }
   
    
}); 

app.get('/meals/:mealId', (req, resp)=> {
    let obj = mealManager.getMeal(req.params.mealId); 
    if(obj){
        resp.status(200).send(obj); 
    }else{
        resp.status(404).send({
            error: {message: "The meal id does not exist"}, 
            params: req.params.id, 
        }); 
    }
}); 

app.put('/meals/:mealId', (req, resp)=> {
    let mealId = req.params.mealId;
    let mealName = req.query.mealName; 
    let amount = req.query.amount; 
    if(  mealName && amount){
        let newObj = mealManager.updateMeal(+mealId, mealName, amount); 
        if(newObj){
            resp.status(201).send(newObj); 
        }else{
            resp.status(404).send({
                message: "Id was not found",
            }); 
            
        }
    }else{
        resp.status(400); 
    }

}); 
app.delete('/meals/:mealId', (req, resp)=> {
    let mealId = req.params.mealId;
   if(mealManager.removeMeal(+mealId)){
            resp.status(200).send({ message: `Successful deleted mealId = ${mealId} `}); 
    }else{
        resp.status(404).send({error:
            { message: "The specified id was not found"}
        }
    ); 
    }
}); 

//Menu Routes

app.post('/menu/', (req, resp)=> {
    if(!req.body.mealsIdArr){
        resp.status(400).send({
            error:{message:"No mealsIdArr in the body"}
        });
    }else if(mealManager.getNumberOfMeals()){ 
        let obj = mealManager.createTodayMenu(req.body.mealsIdArr); 

        if(obj){
            resp.status(201).send(obj);
        }else{
            resp.status(409).send({
                error:{message:"Meal of today has already been created"}
            }); 
        }
    }else{
        resp.status(412).send({
            error:{message:"There are no meals in the system. Create meals first"}
        }); 
    }
    

});

app.put('/menu/', (req, resp)=> {
    if(!req.query.mealsIdArr){
        resp.status(400).send({
            error:{message:"No mealsIdArr in the body"}
        });
    }else {
        let obj = mealManager.updateTodayMenu(req.query.mealsIdArr); 

        if(obj){
            resp.status(201).send(obj);
        }else{
            resp.status(409).send({
                error:{message:"Meal of today has not yet been created"}
            });
        }
    }
    

});

app.get('/menu/', (req, resp) => {
    let obj = mealManager.getTodayMenu(); 
    if(obj) resp.status(200).send(obj);
    else{
        resp.status(404).send({
            error: {message: "Menu of today has not yet been set"}
        }); 
    }
}); 

//Order routes
app.post('/orders/',  (req, resp)=> {
    let mealsIdArr =req.body.mealsIdArr; 
    if(!mealManager.getTodayMenu()){
        resp.status(404).send({
            error: {message: "Today's menu has not yet been set"},
        }); 
    }else if(mealsIdArr){
        let customer = {}; 
        let obj = mealManager.makeOrder(mealsIdArr, customer); 
        if(obj){
            resp.status(201).send({
                createdObj: obj, 
            }); 
        }else{
            resp.status(400).send({
                error: {message: "no valid id was inserted in the order"}, 
            }); 
        }
    }else{
        resp.status(400).send({
            error:{message: "mealsIdArr array is missing"}
        }); 
    }
   
}); 

app.put('/orders/:orderId',  (req, resp)=> {
    let orderId = req.params.orderId; 
    let mealsIdArr = req.query.mealsIdArr; 
    if(orderId && mealsIdArr){
        if(mealManager.getTodayOrderId(orderId)){
            let obj = mealManager.modifyOrder(orderId, mealsIdArr); 
            if(obj){
                resp.status(201).send(obj); 
            }else{
                resp.status(406).send({
                    error: {message: "mealsIdArr has no valid id. Please get id from menu"}, 
                })
            }
        }else{
            resp.status(412).send({
                error: {message:"No order with the specified id has been made."}
            })
        }
        
    }else{
        resp.status(400).send({
            error:{ mesage: "Some required data are missing"}
        })
    }
}); 

app.get('/orders/', (req, resp)=> {
    let orders = mealManager.getOrders(); 
    if(orders && orders.length>0) resp.status(200).send(orders); 
    else{
        resp.sendStatus(204);
    }
}); 

app.get('/orders/caterer/:username', (req, resp)=> {

}); 

app.get('/orders/customer/:username', (req, resp)=> {

}); 