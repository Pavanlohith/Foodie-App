import express from "express"
import authMideeleware from "../middleware/Auth.js"
import { listOrders, placeOrder, updateStatus, usesrOrder, vreifyOrder } from "../contorllers/orderController.js"
const orderRouter=express.Router();

orderRouter.post("/place",authMideeleware,placeOrder)
orderRouter.post("/verify",vreifyOrder)
orderRouter.post("/usersorders",authMideeleware,usesrOrder)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)
export default orderRouter;