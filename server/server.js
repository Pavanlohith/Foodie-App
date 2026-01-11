import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/useROute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// -------------------
// App config
// -------------------
const app = express();
const port = process.env.PORT || 4000;

// -------------------
// CORS config
// -------------------
// Allow only your Netlify frontend
const allowedOrigin = "https://tangerine-kangaroo-e403f4.netlify.app";
app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "token"],
  credentials: true
}));

// Preflight handler for OPTIONS requests
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, token");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// -------------------
// Middleware
// -------------------
app.use(express.json()); // parse JSON body

// Serve uploads
app.use("/images", express.static("uploads"));
app.use("/uploads", express.static("uploads"));

// -------------------
// Database connection
// -------------------
connectDB();

// -------------------
// API Routes
// -------------------
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Root route
app.get("/", (req, res) => {
  res.send("API working");
});

// -------------------
// Start server
// -------------------
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
