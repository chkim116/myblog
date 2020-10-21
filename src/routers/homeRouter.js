import express from "express";
import { totalView } from "../controller/homeController";

const homeRouter = express.Router();

//  /

homeRouter.post("/view", totalView);

export default homeRouter;
