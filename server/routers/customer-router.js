import express from "express"; 
import CustomerController from "../controllers/customer-controller"; 
const customerRouter = express.Router(); 

const controller = new CustomerController(customerRouter); 
export default customerRouter; 

