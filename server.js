import express from "express";
import bodyParser from "body-parser";
import "./db";
import dotenv from "dotenv";
import postRouter from "./src/routers/postRouter";
dotenv.config();
import cors from "cors";

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", postRouter);

app.use("/static", express.static("static"));

app.use(cors());
// server
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`ON ${PORT}`);
});
