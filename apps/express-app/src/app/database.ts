import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });


const connectDB = async () => {
  try {
    mongoose.connect(process.env.DB_CLUSTER, {}, () => {
      console.log("Database Connected");
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};


export default connectDB;
