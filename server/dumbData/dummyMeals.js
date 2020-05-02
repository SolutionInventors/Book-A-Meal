
module.exports =function(){
    const mealService = require('../services/meals'); 

    for(let i =0; i< 50; i++){
        mealService.createMeal(`Rice${i}`, 2000+i, 'img.jpg');
    }
}