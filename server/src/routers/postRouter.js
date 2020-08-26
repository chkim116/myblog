import express from "express";
import { postPosting, getPost } from "../controller/userController";

const postRouter = express.Router();

postRouter.post("/postwriting", postPosting);
export default postRouter;
