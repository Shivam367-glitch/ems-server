import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DB = process.env.MONGO_URI;

export const connectDb=async()=>{
    try {
        await mongoose.connect(DB);
    } catch (error) {
        console.error("Database connection failed",error);
        process.exit(1);
    }
}


