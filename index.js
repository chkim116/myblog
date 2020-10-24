import express from "express";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import mongoStore from "connect-mongo";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import csp from "helmet-csp";
import dotenv from "dotenv";
import helmet from "helmet";
import schedule from "node-schedule";
import http from "http";

import "./db";
dotenv.config();

// Router

import guestRouter from "./src/routers/guestRouter";
import postRouter from "./src/routers/postRouter";
import userRouter from "./src/routers/userRouter";
import tagRouter from "./src/routers/tagRouter";
import categoryRouter from "./src/routers/categoryRouter";
import homeRouter from "./src/routers/homeRouter";

// Schema
import "./src/models/post.js";
import "./src/models/User.js";
import "./src/models/Category.js";
import "./src/models/Comments.js";
import "./src/models/Guest.js";
import "./src/models/Home.js";
import "./passport";
import "./multer";
import { totalView } from "./src/controller/homeController";

const app = express();
const cookieStore = mongoStore(session);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

// middleware
app.use(cors());
app.use(helmet());
app.use(
  csp({
    directives: {
      defaultSrc: ["*"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
    reportOnly: false,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new cookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// if (
//   process.env.NODE_ENV === "production" ||
//   process.env.NODE_ENV === "staging"
// ) {

app.use("/", homeRouter);
app.use("/api", postRouter);
app.use("/port", guestRouter);
app.use("/auth", userRouter);
app.use("/tag", tagRouter);
app.use("/category", categoryRouter);

app.get("/", (req, res) => {
  res.send("welcome to my blog server");
});

// 자정마다 조회수 초기화 및 토탈 추가
const views = schedule.scheduleJob("0 0 0 * * *", totalView);

// heroku sleep 깨우기

setInterval(() => {
  http.get("https://kormelon.herokuapp.com/");
}, 6000000);

// server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Hello, http://localhost:${PORT}`);
});
