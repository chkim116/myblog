import express from "express";
import { getSearchingTags, getTags } from "../controller/tagController";

const tagRouter = express.Router();

tagRouter.get("/", getTags);

tagRouter.get("/search", getSearchingTags);

export default tagRouter;
