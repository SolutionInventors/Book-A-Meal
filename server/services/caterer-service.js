const uuid = require('node-uuid'); 
const Caterer = require('../models/Caterer'); 

class CatererService{
    constructor(){
        this.caterers = []; 
    }

    registercaterer(caterer){
        if(caterer instanceof Caterer){
            caterer.id = uuid.v4(); 
            this.caterers.push(caterer); 
            return caterer; 
        }
    }

    getcaterer(catererId){
        return this.caterers.find((caterer)=> caterer.id == catererId); 
    }

    getcatererByName(name){
        return this.caterers.find((caterer)=> caterer.name == name); 
    }
}
module.exports = new CatererService();
