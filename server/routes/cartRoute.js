import express from 'express'
import { addToCart,removeFromCart,getCart } from "../contorllers/cartController.js";
import { get } from 'mongoose';

import authMideeleware from '../middleware/Auth.js';

const cartRouter=express.Router();

cartRouter.post("/add",authMideeleware,addToCart)
cartRouter.post("/remove",authMideeleware,removeFromCart)
cartRouter.post("/get",authMideeleware,getCart)

export default cartRouter