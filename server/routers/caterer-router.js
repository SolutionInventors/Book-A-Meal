import {Router} from "express"; 
import CatererController from "../controllers/customer-controller"; 
const catererRouter = Router(); 

const controller = new CatererController(catererRouter); 
export default catererRouter; 

