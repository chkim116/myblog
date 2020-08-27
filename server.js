import express from "express";
import bodyParser from "body-parser";
import "./db";
import dotenv from "dotenv";
import postRouter from "./src/routers/postRouter";
dotenv.config();
import cors from "cors";

// ssr
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../client/src/App";

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", postRouter);

app.use("^/$", (req, res, next) => {
  fs.readFile(
    path.resolve("./client/build/index.html"),
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.use(express.static(path.resolve(__dirname, "..", "build")));
app.use(cors());
// server
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`ON ${PORT}`);
});
