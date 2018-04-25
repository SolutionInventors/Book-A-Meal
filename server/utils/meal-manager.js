let appData = {
    allMeals: new Map(), 
    menu: new Map(), 
    orders: new Map(), 
    lastOrderId: 0, 
    lastInsertedMealId: 0, 
}; 


function getAllMeals(){
   return [...appData.allMeals.values()]; 
}

function getMealByName(mealName){
    return [...appData.allMeals.values()].find((item)=> item.mealName == mealName); 
}

function addMeal(mealName, amount){
    if(mealName && amount){
        let id = appData.lastInsertedMealId++; 
        let newMealObj ={
            id, 
            mealName, 
            amount, 
        };  
        appData.allMeals.set(+id, newMealObj);
        return newMealObj; 
    }
    return false; 
    
}

function getMeal(id){
    return appData.allMeals.get(+id); 
}

function updateMeal(id, mealName, amount){
    if(appData.allMeals.has(+id) ){
        let obj = {id, mealName, amount}
        appData.allMeals.set(+id, obj)  ; 
        return obj; 
    }
}

function removeMeal(id){
   return appData.allMeals.delete(+id); 
}

function getMeal(id){
    return appData.allMeals.get(+id)
}

function getNumberOfMeals(){
    return appData.allMeals.size; 
}
function createTodayMenu(menuItemById){
    let todayDateStr=  new Date().toDateString(); 
    if(!appData.menu.has(todayDateStr)){
        return setMenuHelper(menuItemById, todayDateStr); 
    }
}

function setMenuHelper(menuItemById, todayDateStr){
   let menuArr = 
    menuItemById.map((id)=>appData.allMeals.get(+id) )
                .filter((obj)=> obj);
    if(menuArr.length){
        let obj = {
            date: todayDateStr, 
            menu:menuArr, 
        };
        appData.menu.set(todayDateStr, obj); 
        return obj; 
    }
}
function updateTodayMenu(menuItemById, menuItemById){
    let todayDateStr=  new Date().toDateString();
    if(appData.allMeals.has(todayDateStr)){
        return setTodayMenuHelper(menuItemById, new Date().toDateString()); 
    }
    
}
function getTodayMenu(){ 
    return appData.menu.get( new Date().toDateString()); 
}

//functions for orders
function makeOrder(mealsIdArr, customer){
    let todayDateStr = new Date().toDateString(); 
    let mealsArr = mealsIdToMealArr(mealsIdArr);
    if(mealArr.length){
        let orderId =appData.lastOrderId++; 
        let obj = {
            date : todayDateStr, 
            orderId, 
            order: mealsArr,
            customer,  
        };
        appData.orders.set(todayDateStr, obj);
        return obj; 
    }
    
}
function mealsIdToMealArr(mealsIdArr){
    let menu = appData.menu.get(todayStr);
    return  mealsIdArr.map((id)=>
                menu.find((menuItem)=> +menuItem.id == +id))
            .filter((item)=> item); 
}
function modifyOrder(id, mealsIdArr){
    let newMealArr = mealsIdToMealArr(mealsIdArr); 
    let todayDateStr = new Date().toDateString();
    let orders = appData.orders.get(todayDateStr);
    let index = orders.findIndex((item)=> item.orderId == id);
    if(index >= 0 && newMealArr.length> 0) {
        orders[index].order = newMealArr; 
        return orders[index]; 
    } 
}   

function getOrders(dateStr=new Date().todayDateStr()){
    return appData.orders.get(dateStr); 
}
function getAllOrders(){
    return [...appData.orders.values()]; 
}
function getOrderByDate(dateStr){
    return appData.orders.get(dateStr); 
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
    getMeal, 
    getTodayMenu, 
    getNumberOfMeals, 
    updateTodayMenu
}