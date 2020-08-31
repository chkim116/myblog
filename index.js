import express from "express";
import bodyParser from "body-parser";
import "./db";
import postRouter from "./src/routers/postRouter";
import adminRouter from "./src/routers/AdminRouter";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();
import "./src/models/post.js";

// heroku
import path from "path";

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/api", postRouter);
app.use("/api", adminRouter);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}
// server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Hello, http://localhost:${PORT}`);
});
