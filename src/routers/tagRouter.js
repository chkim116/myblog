import express from "express";
import { delTags, getTags, getTagsId } from "../controller/tagController";

const tagRouter = express.Router();

tagRouter.get("/", getTags);

export default tagRouter;
