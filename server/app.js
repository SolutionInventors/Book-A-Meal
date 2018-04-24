const express = require('express'); 
const app = express(); 
const mealManager = require('./utils/meal-manager'); 
const bodyParser = require('body-parser'); 
const jwt = require('jsonwebtoken'); 

 app.use(bodyParser.urlencoded({
     extended:true, 
    }
)); 

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
    if(req.body && mealName  && amount){
        if(mealManager.getMealByName(mealName)){
          
            resp.status(409).send({
                error: {message: "The meal option you want to create already exists"}
            }); 

        }else if(mealManager.addMeal(mealName, amount)){
            resp.status(201).send({
                message:"Successfully created", 
            }); 
        }else{
            resp.send('Failed');   
        }
    }else{
        resp.sendStatus(400); 
    }
   
    
}); 

app.put('/meals/:mealId', (req, resp)=> {
    let mealId = req.params.mealId; 
    console.log(req.body); 

    let mealName = req.query.mealName; 
    let amount = req.query.amount; 
    if(req.body &&  mealName && amount){
        let newObj = mealManager.updateMeal(mealId, mealName, amount); 
        if(newObj){
            resp.status(201).send(newObj); 
        }else{
            resp.status(400).send({
                message: "Invalid mealId",
            }); 
            
        }
    }else{
        resp.status(400); 
    }

}); 
app.delete('/meals/:mealId', (req, resp)=> {
    let mealId = req.params.mealId;
    if(req.body && req.body.mealName  && req.body.amount){
        if(mealManager.removeMeal(mealId)){
            resp.sendStatus(201); 
        }else{
            resp.send('Failed'); 
            
        }
    }else{
        resp.sendStatus(400); 
    } 
}); 

app.post('menu/', (req, resp)=> {

}); 

app.get('menu/', (req, resp) => {

}); 

app.post('orders/',  (req, resp)=> {

}); 

app.put('/prders/:orderId',  (req, resp)=> {

}); 
app.get('/orders', (req, resp)=> {

}); 




