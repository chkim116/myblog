import express from "express";
import { getTags, getTagsId } from "../controller/tagController";

const tagRouter = express.Router();

tagRouter.get("/", getTags);

export default tagRouter;
