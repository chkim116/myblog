import express from "express";
import {
    postRegister,
    postlogin,
    auth,
    logout,
} from "../controller/userController";

const userRouter = express.Router();

// /auth/

// user login
userRouter.post("/register", postRegister, postlogin);
userRouter.post("/login", postlogin);

// user auth
userRouter.get("/", auth, async (req, res) => {
    res.status(200).json({
        id: req.user._id,
        username: req.user.username,
        admin: req.user.admin,
        token: req.token,
    });
});
userRouter.post("/logout", auth, logout);

export default userRouter;