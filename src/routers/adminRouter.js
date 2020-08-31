import express from "express";
import { postRegisterAdmin, getLogin } from "../controller/AdminController";

const adminRouter = express.Router();

adminRouter.post("/admin/register", postRegisterAdmin, getLogin);
adminRouter.get("/login", getLogin);

export default adminRouter;
