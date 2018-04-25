let appData = {
    allMeals: {}, 
    menu:{}, 
    orders: {}, 
    lastOrderId: 0, 
    lastInsertedMealId: 0, 
}; 



function getAllMeals(){
   return Object.values(appData.allMeals); ; 
}

function getMealByName(mealName){
    let obj = 
        Object.values(appData.allMeals)
            .find((item)=> item.mealName == mealName); 
    return obj; 
}

function createMeal(mealName, amount){
    if(mealName && amount){
        let id = appData.lastInsertedMealId++; 
        let newMealObj ={
            id, 
            mealName, 
            amount, 
        };  
        appData.allMeals[id] = newMealObj; 
        return newMealObj; 
    }
    return false; 
    
}

function getMeal(id){
    return appData.allMeals[id]; 
}

function updateMeal(id, mealName, amount){
    if(appData.allMeals[id] ){
        let obj = {id, mealName, amount}
        appData.allMeals[+id] =  obj  ; 
        return obj; 
    }
}

function removeMeal(id){
    if(appData.allMeals[id])  return delete appData.allMeals[id]; 
}

function getMeal(id){
    return appData.allMeals[id]; 
}

function getNumberOfMeals(){
    return Object.values(appData.allMeals).length; 
}

//...Menu functions
function createTodayMenu(menuItemById){
    let todayDateStr=  new Date().toDateString(); 
    if(!appData.menu[todayDateStr]){
        return setMenuHelper(menuItemById, todayDateStr); 
    }
}

function setMenuHelper(menuItemById, todayDateStr){
   let menuObj = {}; 
    menuItemById.map((id)=>appData.allMeals[id])
                .filter((obj)=> obj)
                .forEach(item => menuObj[item.id] = item);;
    if(Object.values(menuObj).length){
        menuObj.date = todayDateStr; 
        appData.menu[todayDateStr] =menuObj ; 
        return menuObj; 
    }
}
function updateTodayMenu(menuItemById, menuItemById){
    let todayDateStr=  new Date().toDateString();
    if(appData.menu[todayDateStr]){
        return setMenuHelper(menuItemById, new Date().toDateString()); 
    }  
}
function getTodayMenu(){ 
    return appData.menu[new Date().toDateString()]; 
}

//functions for orders
function makeOrder(mealsIdArr, customer){
    let todayDateStr = new Date().toDateString(); 
    let order = mealsIdToMealObj(mealsIdArr);
    if(Object.values(order).length){
        let id = appData.lastOrderId++; 
        let orderObj = {
            order, 
            date: todayDateStr, 
            customer:customer, 
            orderId: id, 
        };
        if(!appData.orders[todayDateStr]) appData.orders[todayDateStr]= {};
        appData.orders[todayDateStr][id] =  orderObj;
        return orderObj; 
    }
    
}
function mealsIdToMealObj(mealsIdArr){
    let todayStr = new Date().toDateString();
    let todayMenu=   appData.menu[todayStr];
    if(todayMenu){
        let menuObj ={}; 
        console.log(todayMenu); 
        mealsIdArr.map((id)=>todayMenu[id])
                        .filter((item)=> item)
                        .forEach(item => menuObj[item.id] = item);
        return menuObj; 
    }
}

function modifyOrder(orderId, mealsIdArr){
    let order = mealsIdToMealObj(mealsIdArr); 
    let todayDateStr = new Date().toDateString();
    if(getTodayOrderId(orderId) && Object.values(order).length> 0){
        let prevOrder = appData.orders[todayDateStr][orderId]; 
        prevOrder.order= order; 
        appData.orders[todayDateStr][orderId] = prevOrder; 
        return prevOrder; 
    }
}   

function getTodayOrderId(orderId){
    let obj = appData.orders[new Date().toDateString()]; 
    return obj ? obj[orderId] : undefined; 
}
function getOrders(dateStr=new Date().toDateString()){
    let  orders = appData.orders[dateStr]; 
    if(orders) return Object.values(orders); 
}
function getAllOrders(){
    return Object.values(appData.orders); 
}
function getOrderByDate(dateStr){
    return appData.orders[dateStr]; 
}
module.exports ={
    getAllMeals, 
    createMeal, 
    removeMeal, 
    updateMeal, 
    makeOrder, 
    modifyOrder, 
    createTodayMenu, 
    getMealByName, 
    getMeal, 
    getTodayMenu, 
    getNumberOfMeals, 
    updateTodayMenu, 
    getOrderByDate, 
    getAllOrders, 
    getOrders, 
    getTodayOrderId
}