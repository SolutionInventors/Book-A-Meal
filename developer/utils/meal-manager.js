let mealOptions = new Map(); 

mealOptions.set('allMeal', []); 
mealOptions.set('bookings', []); 
mealOptions.set('todayMeal', []); 
mealOptions.set('orders', []);
mealOptions.set('lastOrderId'); 
mealOptions.set('lastInsertedMealId', 0);


function getAllMeals(){
    let meals = mealOptions.get('allMeals'); 
    return meals; 
}

function addMeal(mealName, amount){
    let meals = mealOptions.get('allMeals');
    let lastInsertedId = mealOptions.get('lastInsertedMealId');  
    meals.push({
        id: lastInsertedId + 1, 
        mealName, 
        amount, 
    }); 
    mealOptions.set('allMeals', meals);
    lastInsertedId++; 
    mealOptions.set('lastInsertedMealId', lastInsertedId);
}

function getMeal(id){
    let meals = mealOptions.get('allMeals');
    let foundObj = meals.find((item)=> item.id == id); 
    return foundObj; 
}

function updateMeal(id, newMealObj){
    let meals = mealOptions.get('allMeals'); 
    newMealObj.id = id; 
    
    mealOptions.map('allMeals', meals.map((mealObj)=>{
        if(mealObj.id == id) return newMealObj; 
        return mealObj; 
    })); 
    
}

function removeMeal(id){
    let meals = mealOptions.get('allMeals'); 
    mealOptions.set('allMeals', meals.filter((item)=> item.id != id)); 

}

function setTodayMeal(mealOptionArr){
    let today=  new Date(); 

    mealOptions.set('todayMeal',{
        date: today.toDateString(), 
        mealOptionArr, 
    }); 

}
function getTodayMeal(){
    let today = new Date(); 
    return 
        mealOptions.get('todayMeal')
        .find((item)=> item.date == today.toDateString()); 
}

function makeOrder(mealsArr){
    let lastId = mealOptions.get('lastOrderId'); 
  
    let orders = mealOptions.get('orders'); 

    orders.push({
        date : new Date().toDateString(), 
        id: lastId +1, 
        OrderedMeals: mealsArr, 
    }); 
    mealOptions.set('orders', orders); 
    mealOptions.set('lastOrderId', lastId+1); 
    return true; 
}

function modifyOrder(id, newMealArr){
    let orders = mealOptions.get('orders');
    if(orders.find((item)=> item.id == id)) {
        orders.map((item)=> {
            if(item.id == id){
                item.OrderedMeals = newMealArr; 
            }
            return item; 
        }); 
        return true; 
    } 
    return false; 

   
}   