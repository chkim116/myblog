import express from "express";
import bodyParser from "body-parser";
import "./db";
import dotenv from "dotenv";
import postRouter from "./src/routers/postRouter";
dotenv.config();
import cors from "cors";
// heroku
import path from "path";

// ssr
import fs from "fs";
import ReactDOMServer from "react-dom/server";
import React from "react";
import App from "./client/src/App";
import "./src/models/post.js";

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", postRouter);

// set static folder
app.use(express.static(path.join(__dirname, "client", "build")));

app.use("^/$", (req, res, next) => {
  fs.readFile(
    path.join(__dirname + "/client/build/index.html"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Some Error");
      }
      return res.send(
        data.replace(
          '<div id="root></div>',
          `<div id="root>${ReactDOMServer.renderToString(<App />)}</div>`
        )
      );
    }
  );
});

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
