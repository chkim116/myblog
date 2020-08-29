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
import React, { useState, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import App from "./client/src/App.js";

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
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

app.use(express.static(path.join(__dirname + "/client/build")));

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
