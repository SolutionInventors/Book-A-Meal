const express = require('express'); 
const app = express(); 
const mealManager = require('utils/meal-manager'); 


app.listen(3333, 'localhost', (error)=>{
    if(error){s
        console.log('Error in setting up server'); 
    }else{
        console.log('Server was set up successfully'); 
    }
}); 

app.get('/meals/', (req, resp)=> {

}); 

app.post('/meals/', (req, resp)=> {

}); 

app.put('/meals/', (req, resp)=> {

}); 
app.delete('/meals/:id', (req, resp)=> {

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




