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

adminRouter.post("/register", postRegister, postlogin);

adminRouter.post("/login", postlogin);

adminRouter.get("/", auth);

adminRouter.get("/id", authId);

adminRouter.post("/logout", logout);
export default adminRouter;
