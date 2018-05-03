import {Router} from "express"; 
import OrderController from "../controllers/order-controller"; 
const orderRouter = Router(); 

const controller = new OrderController(orderRouter); 
export default orderRouter; 

