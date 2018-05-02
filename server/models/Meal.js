
class Meal{
    constructor(name, amount, image){
        this.name = name; 
        this.amount= amount; 
        this.image = image; 
    }

    get name(){
        return this.name; 
    }
    get amount(){
        return this.amount; 
    }
    get image(){
        return this.image; 
    }

    set id(id){
        this.id = id ; 
    }

    get id(){
        return this.id; 
    }
    isValid(){
        return this.name && !Number.isNaN(this.amount) && this.image; 
    }
}

module.exports =  Meal; 