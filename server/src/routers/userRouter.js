import Router from "koa-router";
import { getUser, getText, postUser } from "../controller/userController";

const userRouter = new Router();

userRouter.get("/", getUser);
userRouter.post("/", postUser);
userRouter.get("/:id", getText);
export default userRouter;
