import express from "express";
import { postPosting, getPost } from "../controller/userController";

const postRouter = express.Router();

postRouter.get("/api", getPost);

postRouter.post("/api/post", postPosting);
export default postRouter;
