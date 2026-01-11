import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pavanlohith006_db_user:pavan12345@cluster0.ujc5y2u.mongodb.net/fooddel"
    );
    console.log("✅ DB connected");
  } catch (error) {
    console.error(" DB connection failed:", error.message);
  }
};
