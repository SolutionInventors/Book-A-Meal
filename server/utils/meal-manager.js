let appData = {
    allMeals: [], 
    menu: [], 
    orders: [], 
    lastOrderId: 0, 
    lastInsertedMealId: 0, 
}; 

/*{
    allMeals: new Map(id, {id, mealName:'Rice', amount:2000}), 
    menu: new Map(dateCreated, [{mealName, amount}] ), 
    orders: new Map(user, )
} 

appData['allMeals'].has(2); */
function getAllMeals(){
    let meals = appData.get('allMeals'); 
    return meals; 
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
    let foundObj = appData.allMeals.find((item)=> item.id == id);
    return foundObj; 
}

function updateMeal(id, mealName, amount){
    let success = false;
    appData.allMeals.map((mealObj)=>{
        if(mealObj.id == id){ 
            success = true; 
            return {id, mealName, amount}
        }; 
        return mealObj; 
    });  
    
    return success; 
}

function removeMeal(id){
   appData.allMeals = appData.allMeals.filter((item)=> item.id != id); 
    return true; 
}

function createTodayMenu(mealOptionArr){
    
    let today=  new Date(); 

    let index = appData.menu.find((item) => item.date == today.toDateString()); 
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
    getTodayMenu, 
    createTodayMenu, 

}