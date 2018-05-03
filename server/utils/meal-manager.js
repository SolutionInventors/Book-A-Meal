let appData = {
    allMeals: {}, 
    menu:{}, 
    orders: {}, 
    lastOrderId: 0, 
    lastInsertedMealId: 0, 
}; 



function getAllMeals(){
   return Object.values(appData.allMeals) ; 
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
        let obj =  {
            menuObj, 
            date: todayDateStr}; 
        appData.menu[todayDateStr] =obj ; 
        return obj; 
    }
}
function updateTodayMenu(menuItemById){
    let todayDateStr=  new Date().toDateString();
    if(appData.menu[todayDateStr]){
        return setMenuHelper(menuItemById, todayDateStr); 
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
        mealsIdArr.map((id)=>todayMenu.menuObj[id])
                        .filter((item)=> item)
                        .forEach(item => menuObj[item.id] = item);
        return menuObj; 
    }
}

function modifyOrder(orderId, mealsIdArr){
    let order = mealsIdToMealObj(mealsIdArr); 
    let todayDateStr = new Date().toDateString();
    if(getTodayOrderById(orderId) && Object.values(order).length> 0){
        let prevOrder = appData.orders[todayDateStr][orderId]; 
        prevOrder.order= order; 
        appData.orders[todayDateStr][orderId] = prevOrder; 
        return prevOrder; 
    }
}   

function getTodayOrderById(orderId){
    let obj = appData.orders[new Date().toDateString()]; 
    return obj ? obj[orderId] : undefined; 
}
function getOrders(dateStr=new Date().toDateString()){
    let  orders = appData.orders[dateStr]; 
    if(orders) return Object.values(orders); 
}
function getAllOrders(userObj){
    let orders = 
        Object.values(appData.orders)
              .map((orderObj)=> Object.values(orderObj)[0]); 
    if(userObj.userType== 'customer'){
        return orders.filter((orderObj)=>orderObj.customer.username == userObj.username); 
    }
    return orders; 
}
function getOrderByDate(userObj, dateStr){
    let orders = Object.values(appData.orders[dateStr]); 
    if(userObj.userType== 'customer'){
        return orders.filter((orderObj)=>orderObj.customer.username == userObj.username); 
    }
    return orders; 
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
    getAllOrders, 
    getOrders, 
    getTodayOrderById, 
    getOrderByDate, 
}