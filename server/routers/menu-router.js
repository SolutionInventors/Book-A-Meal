import { Router } from "express"; 
import MenuController from "../controllers/menu-controller"; 
const menuRouter =Router(); 

const controller = new MenuController(menuRouter); 
export default menuRouter; 

