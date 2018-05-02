
const uuid = require('node-uuid') ; 

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
        if(name && amount && image){
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

    update(mealId, mealName, amount, image){
        let mealIndex = this.meals.findIndex((obj)=> obj.mealId==mealName); 

        if(mealIndex >= 0){
            let mealObj = this.meals[mealIndex];
           let newObj = {
               mealName: mealName? mealName:mealObj.mealName,
                amount: amount? amount: mealObj.amount,
                image: image? image: mealObj.image,
            }; 
            this.meals[mealIndex] = newObj;
            return newObj; 
        }
        return false; 
    }
}

module.exports =  new MealsService();
