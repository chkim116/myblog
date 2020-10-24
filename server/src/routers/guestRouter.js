import express from "express";
import { uploadImage } from "../../multer";
import {
  getGuest,
  getGuestById,
  postGuest,
  guestEditing,
  guestDeleting,
} from "../controller/guestController";

const guestRouter = express.Router();

//  /port/

// port get All
guestRouter.get("/", getGuest);

// port get By Id
guestRouter.get("/:id", getGuestById);

// port Upload
guestRouter.post("/post", postGuest);

// port Update
guestRouter.post("/edit/:id", guestEditing);

// post Delete
guestRouter.get("/del/:id", guestDeleting);

export default guestRouter;
