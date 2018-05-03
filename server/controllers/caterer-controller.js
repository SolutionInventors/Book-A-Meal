import { getCaterer } from "../services/caterer-service"; 

export default class CatererController{
    constructor(router){
        this.router = router; 
        this.registerRoutes(); 
    }

    registerRoutes(){
        this.router.post('/login', this.login.bind(this)); 
        // this.router.post('/invite', this.login.bind(this)); 
    }

    login(req, resp){
        let {username, password} =req.body; 
        if(username && password){
            let caterer = getCaterer(username, password);
            if(caterer){
                resp.status(200).json({
                    success:true, 
                    caterer, 
                }); 
            }else{
                resp.status(404).json({
                    success:false, 
                    message:'Wrong username and password'
                })
            }
            
        }else{
            resp.status(400).json({
                success: false, 
                message:'Some required arguments are missing', 
            })
        }
    }
}

