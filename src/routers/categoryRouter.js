import express from "express";
import {
  createCategory,
  delCategory,
  editCategory,
  getCategory,
} from "../controller/categoryController";
import { auth } from "../controller/userController";

const categoryRouter = express.Router();

//  /category ~~

// create

categoryRouter.post("/create", auth, createCategory);

// read

categoryRouter.get("/", getCategory);

// edit

categoryRouter.post("/edit", auth, editCategory);

// delete

categoryRouter.get("/del/:id", auth, delCategory);

export default categoryRouter;
