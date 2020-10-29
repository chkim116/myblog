import express from "express";
import {
  postPosting,
  getPost,
  getPostById,
  postEditing,
  postDeleting,
  getAllPost,
  postComments,
  delComments,
} from "../controller/postController";
import { auth } from "../controller/userController";

const postRouter = express.Router();

// /api/

// post get ALL!
postRouter.get("/" || "?page", getPost);

postRouter.get("/all", getAllPost);
// post get by ID
postRouter.get("/:id", auth, getPostById);
// post Upload
postRouter.post("/post", auth, postPosting);

// post Update
postRouter.post("/edit/:id", auth, postEditing);

// post delete
postRouter.get("/del/:id", auth, postDeleting);

// comments create
postRouter.post("/comment/:id", auth, postComments);

// commetns delete
postRouter.get("/comment/del/:id", auth, delComments);

// image

export default postRouter;
