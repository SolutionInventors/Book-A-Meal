const menuService = require('../services/menu-service'); 
const Menu = require('../models/Menu'); 


class MenuController{
    constructor(router){
        this.router = router; 
        this.registerRoutes(); 
    }

    registerRoutes(){
        this.router.get('/menu/', this.retrieve.bind(this)); 
        this.router.post('/menu/', this.create.bind(this)); 
    }

    retrieve(req, resp){
        let menu = menuService.getMenu(); 
        if(menu){
            
        }
    }

}

module.exports = CatererController; 
