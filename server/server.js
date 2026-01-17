import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/useROute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;
app.use(
  cors({
    origin: "https://tangerine-kangaroo-e403f4.netlify.app",
    credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// -------------------
// Apply CORS before any route
// -------------------
// const allowedOrigin = "https://tangerine-kangaroo-e403f4.netlify.app";
// app.use(cors({
//   origin: allowedOrigin,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "token"],
//   credentials: true
// }));

// // Preflight OPTIONS handler
// app.options("*", (req, res) => {
//   res.header("Access-Control-Allow-Origin", allowedOrigin);
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, token");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.sendStatus(200);
// });

// Parse JSON body
app.use(express.json());

// Serve uploads
app.use("/images", express.static("uploads"));
app.use("/uploads", express.static("uploads"));

// Database connection
connectDB();

// API Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Root
app.get("/", (req, res) => res.send("API working"));

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
