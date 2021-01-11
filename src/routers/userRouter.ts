import express from "express";
import {
    postRegister,
    postlogin,
    auth,
    logout,
} from "../controller/userController";
import { UserType } from "../models/User";

const userRouter = express.Router();

// /auth/

// user login
userRouter.post("/register", postRegister, postlogin);
userRouter.post("/login", postlogin);

// user auth
userRouter.get("/", auth, async (req, res) => {
    const user = req.user as UserType;
    res.status(200).json({
        id: user._id,
        username: user.username,
        admin: user.admin,
        token: (req as any).token,
    });
});
userRouter.post("/logout", auth, logout);

export default userRouter;
