
class Meal{
    constructor(name, amount, image){
        this.name = name; 
        this.amount= amount; 
        this.image = image; 
    }

    isValid(){
        return this.name && !Number.isNaN(this.amount) && this.image; 
    }
}

export default Meal; 