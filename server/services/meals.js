import uuid from "node-uuid"; 

class MealsService{
    constructor(){
        this.meals = []; 
    }

    getAllMeals(){
        return this.meals; 
    }

    getMealById(mealId){
        return this.meals.find((mealObj)=> mealObj.id == mealId);
    }
    createMeal(name, amount, image){
        if(mealName && amount && image){
            let mealObj = {name, amount, image}; 
            mealObj.id = uuid.v4(); 
            this.meals.push(mealObj); 
            return true; 
        }
        return false; 
    }

    getByName(mealName){
        return this.meals.find((mealObj)=> mealObj.mealName == mealName);
    }
}


export default new MealsService();