const mealService = require('../services/meals'); 
const uuid = require('node-uuid') ; 
const Menu = require('../models/Menu'); 

class MenuService{
    constructor(){
        this.menu = []; 
    }

    createTodayMenu( menuObj){
        if(menuObj) menuObj.date= new Date().toDateString(); 
        
        if(menuObj instanceof Menu && menuObj.isValid() ){
            menuObj.id = uuid.v4(); 
            this.menu.push(menuObj); 
            return menuObj; 
        }
        return false; 
    }

    getMenu(dateStr = new Date().toDateString()){
        return this.menu.find((item)=> item.date == dateStr); 
    }

    updateTodayMenu(mealIdArr){
        let menu = getMealsFromArray(mealIdArr); 
        let index= this.menu.findIndex((item)=> item.dateStr ==  dateStr); 
        if(index>= 0  && menu){
            let dateStr = new Date().toDateString();
            let newObj = {
                menu: menuArr, 
                date: todayStr, 
                id:uuid.v4()
            }
            this.menu[index] = newObj; 
            return newObj; 
        }
        
    }
    static getMealsFromArray(mealIdArr) {
        return mealIdArr.map((id) => mealService
            .getMealById(id))
            .filter((item) => item);
    }
}

module.exports = new MenuService(); 


