import express from "express";
import { postPosting, getPost } from "../controller/userController";

const postRouter = express.Router();

postRouter.get("/", getPost);

postRouter.post("/api/post", postPosting);
export default postRouter;
