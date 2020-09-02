import express from "express";
import {
  postRegister,
  postlogin,
  auth,
  logout,
} from "../controller/AdminController";

const adminRouter = express.Router();

// /auth/

adminRouter.post("/register", postRegister, postlogin);

adminRouter.post("/login", postlogin);

adminRouter.get("/", auth);

adminRouter.post("/logout", logout);
export default adminRouter;
