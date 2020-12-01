import express from "express";
import {
    getGuest,
    getGuestById,
    postGuest,
    guestEditing,
    guestDeleting,
} from "../controller/guestController";
import { auth } from "../controller/userController";

const guestRouter = express.Router();

//  /port/

// port get All
guestRouter.get("/", getGuest);

// port get By Id
guestRouter.get("/:id", getGuestById);

// port Upload
guestRouter.post("/post", auth, postGuest);

// port Update
guestRouter.post("/edit/:id", auth, guestEditing);

// post Delete
guestRouter.get("/del/:id", auth, guestDeleting);

export default guestRouter;
