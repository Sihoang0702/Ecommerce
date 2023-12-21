import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    if (connect.connection.readyState === 1) {
      console.log("DB conncect is successfully");
    } else {
      console.log("DB connecting...");
    }
  } catch (error) {
    console.log("DB connection error: " + error);
    throw new Error(error);
  }
};
export default dbConnect;
