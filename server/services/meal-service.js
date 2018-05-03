
import { v4 } from "node-uuid"; 
import Meal from "../models/Meal";
class MealService{
    constructor(){
        this.meals = []; 
    }

    getAllMeals(){
        return this.meals; 
    }

    getMealById(mealId){
        return this.meals.find((mealObj)=> mealObj.id == mealId);
    }
    createMeal(mealObj){
        if(mealObj instanceof Meal && mealObj.isValid()){ 
            if(this.exists(mealObj.name)){
                return false; 
            }
            mealObj.id = v4(); 
            this.meals.push(mealObj); 
            return mealObj;
        }
    }

    getByName(mealName){
        return this.meals.find((mealObj)=> mealObj.name == mealName);
    }

    exists(mealName){
        return !!this.getByName(mealName);
    }
    update(mealId,newMealObj){

        if(newMealObj instanceof Meal){
            let mealIndex = this.meals.findIndex((meal)=> meal.id==mealId); 

            if(mealIndex >= 0 && newMealObj.isValid()){
                newMealObj.id = this.meals[mealIndex].id; 
                this.meals[mealIndex] = newMealObj;
                return newObj; 
            }
            return false; 
        }

    }

    delete(mealId){
        let index = this.meals.findIndex((obj)=> obj.id==mealId); 
        if(index >= 0 ) return this.meals.splice(index, 1)[0]; 
    }
}

export default new MealService();
