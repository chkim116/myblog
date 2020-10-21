import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { MONGO_ATLAS, MONGO_ATLAS_STABUCKS } = process.env;

mongoose.connect(MONGO_ATLAS_STABUCKS, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to DB");
});

db.on("error", (err) => console.log(`error! 연결에러${err}`));
