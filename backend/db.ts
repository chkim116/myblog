import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongo = process.env.MONGO_ATLAS as string;

mongoose.connect(mongo, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to DB");
});

db.on("error", (err) => console.log(`error! 연결에러${err}`));
