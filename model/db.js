import mongoose from "mongoose";

async function connect_db() {
  for (let i = 0; i < 4; ++i) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log("Connected to MongoDB Successfully");
      break;
    } catch (err) {
      console.log("Failed Attempt", i);
      if (i >= 3) {
        throw err.name;
      }
    }
  }
}

export default connect_db;
