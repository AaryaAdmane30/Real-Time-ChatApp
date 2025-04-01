import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Mongo Db connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    console.log("Mongo Db connection Failed", error);
  }
};
