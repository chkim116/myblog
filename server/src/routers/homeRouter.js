import express from "express";

import { checkView, checkIp, getView } from "../controller/homeController";

const homeRouter = express.Router();

//  /

homeRouter.post("/view", getView, checkIp, checkView);

export default homeRouter;
