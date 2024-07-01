import mongoose from "mongoose";
import { DB_NAME } from "../../utils.js";
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("MongoDB connected succesfully!!");
  } catch {
    (error) => {
      console.log(`Mongo db connection error`, error);
      process.exit(1);
    };
  }
};

export default connectDB;
