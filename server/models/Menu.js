
class Menu{
    constructor(date, menu){
        this.menu = menu; 
        if(date instanceof Date){
            this.date = date.toDateString(); 
        } 

    }

    set date(date){
        this.date = date.toDateString(); 
    }
    get date(){
        return this.date; 
    }
    set id(id){
        this.id = id; 
    }

    get id(){
        return this.id; 
    }

    isValid(){
        return Array.isArray(this.menu)&& this.menu.length>0 && this.date; 
    }

}

module.exports = Menu; 