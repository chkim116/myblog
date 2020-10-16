import express from "express";
import {
  postPosting,
  getPost,
  getPostById,
  postEditing,
  postDeleting,
  getAllPost,
  postSearching,
} from "../controller/postController";

const postRouter = express.Router();

// /api/

// post get ALL!
postRouter.get("/" || "?page", getPost);

postRouter.get("/all", getAllPost);
// post get by ID
postRouter.get("/:id", getPostById);
// post Upload
postRouter.post("/post", postPosting);

// post Update
postRouter.post("/edit/:id", postEditing);

// post delete
postRouter.get("/del/:id", postDeleting);

// searching post
postRouter.get("/searching", postSearching);

export default postRouter;
