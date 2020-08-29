import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { MONGO_ATLAS } = process.env;
const { MONGO_URL } = process.env;
import "../src/models/Post";

mongoose.connect(MONGO_ATLAS || MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to DB");
});
