import express from "express";
import {
  postRegister,
  postlogin,
  auth,
  logout,
  authId,
} from "../controller/AdminController";

const adminRouter = express.Router();

// /auth/

// user login
adminRouter.post("/register", postRegister, postlogin);
adminRouter.post("/login", postlogin);
adminRouter.post("/logout", logout);

// user auth
adminRouter.get("/", auth);
adminRouter.get("/id", authId);

export default adminRouter;
