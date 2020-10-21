import express from "express";

import {
  checkView,
  checkIp,
  getView,
  totalView,
} from "../controller/homeController";

const homeRouter = express.Router();

//  /

homeRouter.post("/view", getView, checkIp, checkView);

homeRouter.post("/total", totalView);

export default homeRouter;
