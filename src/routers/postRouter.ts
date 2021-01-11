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
    postImg,
} from "../controller/postController";
import { auth } from "../controller/userController";
import { uploadImage } from "../../multer";

const postRouter = express.Router();

// /api/

// post get ALL!
postRouter.get("/", getPost);

postRouter.get("/all", getAllPost);

// post get by ID
postRouter.get("/:id", auth, getPostById);

// post Upload
postRouter.post("/post", auth, postPosting);

// post image
postRouter.post("/img", uploadImage, postImg);

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
