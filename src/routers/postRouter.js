import express from "express";
import {
  postPosting,
  getPost,
  getPostById,
} from "../controller/postController";

const postRouter = express.Router();

// /api/
postRouter.get("/", getPost);

postRouter.post("/post", postPosting);

postRouter.get("/:id", getPostById);

export default postRouter;
