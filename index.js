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

import "./db";
dotenv.config();

// Router

import postRouter from "./src/routers/postRouter";
import userRouter from "./src/routers/userRouter";
// Schema
import "./src/models/post.js";
import "./src/models/User.js";
import "./passport";
import "./multer";
import portfolioRouter from "./src/routers/portfolioRouter";
import helmet from "helmet";

const app = express();
const cookieStore = mongoStore(session);

// middleware
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
app.use(helmet());
app.use(
  csp({
    directives: {
      imgSrc: ["'self'", "*"],
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
app.use(express.static("./client/build"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client", "build", "index.html"));
});
// }

app.use("/api", postRouter);
app.use("/port", portfolioRouter);
app.use("/auth", userRouter);

// server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Hello, http://localhost:${PORT}`);
});
