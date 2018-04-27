'use strict'; 

const express = require('express'); 
const app = express(); 
const mealManager = require('./utils/meal-manager'); 
const bodyParser = require('body-parser'); 
const jwt = require('jsonwebtoken'); 

const authenticator = require('./utils/authenticator'); 
const port = process.env.PORT || 3333; 

 app.use(bodyParser.urlencoded({
     extended:true, 
    }
)); 
app.use(bodyParser.json()); 

app.use((req, resp, next)=> {
    resp.header('Access-Control-Allow-Origin', '*'); 
    resp.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS'); 
    resp.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); 
    next();
});

app.listen(port, 'localhost', (error)=>{
    if(error){
        console.log('Error in setting up server'); 
    }else{
        console.log(`Server was set up successfully at port ${port}`); 
    }
}); 


app.post('/signup/', (req, resp)=> {
    let {username, password, email, userType}  = req.body; 

    if(username && password && email ){
        let user = {username, password, email, userType: 'customer'} ;
        if(authenticator.exists(user, 'customer')){
            resp.status(409).send({
                error: {message: 'Specified username or email already exists'}, 
            })
        }else{
            authenticator.createToken(user, resp); 
        }
    }
    else{
        resp.status(400).send({
            error: {message: 'Some required fields are missing'}, 
        })
    }

}); 

app.post('/login', (req, resp)=> {
    let{username, password, userType}  = req.body;
    let user = authenticator.getUser(username, userType); 
    if(username && password && userType){
        if(user && user.password == password && user.userType == userType){
            authenticator.createToken(user, resp);   
        }else{
            resp.status(403).send({
                error: {message: 'Authentification failed'}
            })
        }
    }else{
        resp.status(400).send({
            error: {message: 'Some required fields are missing'}, 
        }); 
    }
}); 

app.get('/meals/', authenticator.verify, (req, resp)=> {
    authenticator.processRequest(req, resp, 'caterer', () =>{
        let meals = mealManager.getAllMeals(); 
        resp.status(401).json(meals); 
    });  
}); 

app.post('/meals/', authenticator.verify,  (req, resp)=> {
    authenticator.processRequest(req, resp, 'caterer', () =>{
        let {mealName, amount} = req.body; 
        let obj;
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
    }); 
}); 

app.get('/meals/:mealId', authenticator.verify, (req, resp)=> {
    authenticator.processRequest(req, resp, 'caterer', () =>{
        let obj = mealManager.getMeal(req.params.mealId); 
        if(obj){
            resp.status(200).send(obj); 
        }else{
            resp.status(404).send({
                error: {message: 'The meal id does not exist'}, 
                params: req.params.id, 
            }); 
        }
    });
    
}); 

app.put('/meals/:mealId', authenticator.verify, (req, resp)=> {
    authenticator.processRequest(req, resp, 'caterer', () =>{
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
    });

    

}); 
app.delete('/meals/:mealId', authenticator.verify, (req, resp)=> {
    authenticator.processRequest(req, resp, 'caterer', () =>{
        let mealId = req.params.mealId;
        if(mealManager.removeMeal(+mealId)){
                 resp.status(200).send({ message: `Successful deleted mealId = ${mealId} `}); 
         }else{
             resp.status(404).send({error:
                 { message: 'The specified id was not found'}
             }); 
        }
    }); 
    
}); 

//Menu Routes

app.post('/menu/', authenticator.verify, (req, resp)=> {
    authenticator.processRequest(req, resp, 'caterer', () =>{
        if(!req.body.mealsIdArr){
            resp.status(400).send({
                error:{message:'No mealsIdArr in the body'}
            });
        }else if(mealManager.getNumberOfMeals()){ 
            let obj = mealManager.createTodayMenu(req.body.mealsIdArr); 
    
            if(obj){
                resp.status(201).send(obj);
            }else{
                resp.status(409).send({
                    error:{message:'Meal of today has already been created'}
                }); 
            }
        }else{
            resp.status(412).send({
                error:{message:'There are no meals in the system. Create meals first'}
            }); 
        }
    }); 
});

app.put('/menu/', authenticator.verify, (req, resp)=> {
    authenticator.processRequest(req, resp, 'caterer', () =>{
        if(!req.query.mealsIdArr){
            resp.status(400).send({
                error:{message:'No mealsIdArr in the body'}
            });
        }else {
            let obj = mealManager.updateTodayMenu(req.query.mealsIdArr); 
    
            if(obj){
                resp.status(201).send(obj);
            }else{
                resp.status(409).send({
                    error:{message:'Meal of today has not yet been created'}
                });
            }
        }
    });

    
    

});

app.get('/menu/', authenticator.verify, (req, resp) => {
    authenticator.processRequest(req, resp, 'both', () =>{
        let obj = mealManager.getTodayMenu(); 
        if(obj) resp.status(200).send(obj);
        else{
            resp.status(404).send({
                error: {message: 'Menu of today has not yet been set'}
            }); 
        }
    }) ;
}); 

//Order routes
app.post('/orders/', authenticator.verify,  (req, resp)=> {
    authenticator.processRequest(req, resp, 'customer', (user) =>{
        let mealsIdArr =req.body.mealsIdArr; 
        if(!mealManager.getTodayMenu()){
            resp.status(404).send({
                error: {message: 'Today\'s menu has not yet been set'},
            }); 
        }else if(mealsIdArr){
            let customer = {
                username: user.username, 
                email: user.email, 
            }; 
            let obj = mealManager.makeOrder(mealsIdArr, customer); 
            if(obj){
                resp.status(201).send(obj); 
            }else{
                resp.status(400).send({
                    error: {message: 'no valid id was inserted in the order'}, 
                }); 
            }
        }else{
            resp.status(400).send({
                error:{message: 'mealsIdArr array is missing'}
            }); 
        }
    
    }); 
    
}); 

app.put('/orders/:orderId', authenticator.verify,  (req, resp)=> {
    authenticator.processRequest(req, resp, 'caterer', () =>{
        let orderId = req.params.orderId; 
        let mealsIdArr = req.query.mealsIdArr; 
        if(orderId && mealsIdArr){
            if(mealManager.getTodayOrderById(orderId)){
                let obj = mealManager.modifyOrder(orderId, mealsIdArr); 
                if(obj){
                    resp.status(201).send(obj); 
                }else{
                    resp.status(406).send({
                        error: {message: 'mealsIdArr has no valid id. Please get id from menu'}, 
                    })
                }
            }else{
                resp.status(412).send({
                    error: {message:'No order with the specified id has been made.'}
                })
            }
            
        }else{
            resp.status(400).send({
                error:{ mesage: 'Some required data are missing'}
            })
        }
    }); 

    
}); 

app.get('/orders/', authenticator.verify, (req, resp)=> {
    authenticator.processRequest(req, resp, 'caterer', () =>{
        let orders = mealManager.getOrders(); 
        if(orders && orders.length>0) resp.status(200).send(orders); 
        else{
            resp.sendStatus(204);
        }
    }); 
    
}); 

app.get('/orders/history/:date', authenticator.verify, (req, resp)=> {
    authenticator.processRequest(req, resp, 'both', (user) =>{
        let date = new Date(req.params.date).toDateString(); 
        if(date == "Invalid Date"){
            resp.status(400).send({
                error:{message: 'Date field is invalid'},
            })
        }else{
            resp.status(200).send(mealManager.getOrderByDate(user, date)); 
        }
    }); 

}); 

app.get('/orders/history/', authenticator.verify, (req, resp)=> {
    authenticator.processRequest(req, resp, 'both', (user) =>{
        let obj = mealManager.getAllOrders(user); 
        resp.status(200).send(obj); 
    }); 

}); 

app.post('/caterer/new', authenticator.verify, (req, resp)=> {
    authenticator.processRequest(req, resp, 'caterer', (user) =>{
        let {username, password, email}  = req.body; 

        if(username && password && email ){
            let user = {username, password, email, userType: 'caterer'} ;
            if(authenticator.exists(user, 'caterer')){
                resp.status(409).send({
                    error: {message: 'Specified username or email already exists'}, 
                })
            }else{
                authenticator.createToken(user, resp); 
            }
        }
        else{
            resp.status(400).send({
                error: {message: 'Some required fields are missing'}, 
            })
        }
    }); 

    

}); 

