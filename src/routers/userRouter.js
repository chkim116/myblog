import express from "express";
import {
  postRegister,
  postlogin,
  auth,
  logout,
  authId,
} from "../controller/userController";

const userRouter = express.Router();

// /auth/

// user login
userRouter.post("/register", postRegister, postlogin);
userRouter.post("/login", postlogin);
userRouter.post("/logout", logout);

// user auth
userRouter.get("/", auth);
userRouter.get("/id", authId);

export default userRouter;
