import express from 'express'
import cors from 'cors'
import cors from "cors";

import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/useROute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'

import orderRouter from './routes/orderRoute.js'
// Allow frontend domain
app.use(cors({
  origin: ["https://tangerine-kangaroo-e403f4.netlify.app/"], // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "token"], // include any custom headers
  credentials: true // if you send cookies
}));

//app config

const app=express()
const port=4000

// middleware
app.use(express.json())
app.use(cors())
 //db connectin
connectDB();

//api end poin
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use('/uploads', express.static('uploads'));

app.get("/",(req,res)=>{
    res.send("API working")

})

app.listen(port,()=>{
    console.log("sevrer stsarted")
})