let appData = {
    allMeals: [], 
    menu: [], 
    orders: [], 
    lastOrderId: 0, 
    lastInsertedMealId: 0, 
}; 


function getAllMeals(){
    let meals = appData['allMeals']; 
    return meals; 
}

function getMealByName(mealName){
    return appData.allMeals.find((item)=> item.mealName == mealName); 
}
function addMeal(mealName, amount){
    
    if(mealName && amount){
        let newMealObj ={
            id: appData.lastInsertedMealId++, 
            mealName, 
            amount, 
        };  
        appData.allMeals.push(newMealObj); 
        return newMealObj; 
    }
    return false; 
    
}

function getMeal(id){
    return 
        appData.allMeals
        .find((item)=> item.id == id);
     
}

function updateMeal(id, mealName, amount){
    let obj; 
    let index = appData.allMeals.findIndex((item)=> item.id == id); 
    if(index >= 0 ){
        obj = {id, mealName, amount}
        appData.allMeals[index] =obj ; 
    }
   
    return obj; 
}

function removeMeal(id){
   appData.allMeals = appData.allMeals.filter((item)=> item.id != id); 
    return true; 
}


function createTodayMenu(mealOptionArr){
    
    let today=  new Date(); 

    let index = appData.menu.findIndex((item) => item.date == today.toDateString()); 
    if(index >  0 ){
        appData.menu[index] = {
            date: today.toDateString(), 
            mealOptionArr, 
        }
    }else{
        appData.menu.push({
            date: today.toDateString(), 
            mealOptionArr, 
        })
    }
    appData.set('menu',menuArr); 
    return true; 
}
function getTodayMeal(){
    let today = new Date(); 
    return 
        appData['menu']
        .find((item)=> item.date == today.toDateString()); 
}

function makeOrder(mealsArr){
    appData.orders.push({
        date : new Date().toDateString(), 
        id: appData['lastOrderId']++, 
        OrderedMeals: mealsArr, 
    }); 
    return true; 
}

function modifyOrder(id, newMealArr){
    let orders = appData.get('orders');
    if(appData.orders.find((item)=> item.id == id)) {
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
module.exports ={
    getAllMeals, 
    addMeal, 
    removeMeal, 
    updateMeal, 
    makeOrder, 
    modifyOrder, 
    createTodayMenu, 
    getMealByName, 
}