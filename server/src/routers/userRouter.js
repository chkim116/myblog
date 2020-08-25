import Router from "koa-router";
import {
  getUser,
  postUser,
  userRegister,
  userLogin,
  userLogout,
} from "../controller/userController";
import { adminRegister } from "../controller/adminController";

const userRouter = new Router();

userRouter.get("/", getUser);
userRouter.post("/:id", postUser);

userRouter.post("/auth/register", userRegister);
userRouter.post("/auth/login", userLogin);
userRouter.post("/auth/logout", userLogout);

userRouter.get("/auth/admin/register", adminRegister);

export default userRouter;
