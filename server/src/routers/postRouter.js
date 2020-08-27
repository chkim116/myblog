import express from "express";
import {
  postPosting,
  getPost,
  getPostById,
} from "../controller/userController";

const postRouter = express.Router();

postRouter.get("/api", getPost);

postRouter.post("/api/post", postPosting);

postRouter.get(`/:id`, getPostById);
export default postRouter;
