import mongoose from "mongoose";

async function connect_db() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Successfully!!");
  } catch (error) {
    console.log("Error in connecting DB", error.message);
  }
}
export default connect_db;
