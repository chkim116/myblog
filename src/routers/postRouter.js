import express from "express";
import {
  postPosting,
  getPost,
  getPostById,
  postEditing,
  postDeleting,
} from "../controller/postController";

const postRouter = express.Router();

// /api/
postRouter.get("/", getPost);

// post get by ID
postRouter.get("/:id", getPostById);

// post Upload
postRouter.post("/post", postPosting);

// post Updata
postRouter.post("/edit/:id", postEditing);

// post delete
postRouter.get("/del/:id", postDeleting);

export default postRouter;
