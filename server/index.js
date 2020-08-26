import express from "express";
import bodyParser from "body-parser";
import "./db";
import dotenv from "dotenv";
import postRouter from "./src/routers/postRouter";
dotenv.config();

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", postRouter);

// server
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log("http://localhost:4000, and http://localhost:3000");
});
