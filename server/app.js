const express = require('express'); 
const app = express(); 
const mealManager = require('./utils/meal-manager'); 


app.listen(3333, 'localhost', (error)=>{
    if(error){s
        console.log('Error in setting up server'); 
    }else{
        console.log('Server was set up successfully at port 3333'); 
    }
}); 

app.get('/meals/', (req, resp)=> {
    let meals = mealManager.getAllMeals(); 
    resp.json(meals)
}); 

app.post('/meals/', (req, resp)=> {
    
    console.log(req.body); 
    if(req.body && req.body.mealName  && req.body.amount){
        if(mealManager.addMeal(req.body.mealName, req.body.amount)){
            resp.sendStatus(201); 
        }else{
            resp.send('Failed'); 
            
        }
    }else{
        resp.sendStatus(400); 
    }
   
    
}); 

app.put('/meals/:mealId', (req, resp)=> {
    let mealId = req.params.mealId; 
    if(req.body && req.body.mealName  && req.body.amount){
        if(mealManager.updateMeal(mealId, req.body.mealName, req.body.amount)){
            resp.sendStatus(201); 
        }else{
            resp.send('Failed'); 
            
        }
    }else{
        resp.sendStatus(400); 
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

app.post('orders/', (req, resp)=> {

}); 

app.put('/prders/:orderId', (req, resp)=> {

}); 
app.get('/orders', (req, resp)=> {

}); 




