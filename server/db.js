import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { MONGO_ATLAS } = process.env;

mongoose.connect(MONGO_ATLAS, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to DB");
});
