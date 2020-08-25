import Koa from "koa";
import Router from "koa-router";
import userRouter from "./src/routers/userRouter";
import bodyParser from "koa-body-parser";
import "./db";
import dotenv from "dotenv";
dotenv.config();

const app = new Koa();
const router = new Router();

// router
router.use("/api", userRouter.routes());

// middleware
app.use(bodyParser()); // router전에 적용
app.use(router.routes()).use(router.allowedMethods());

// server
const { PORT } = process.env;
app.listen(PORT, () => {
  console.log("http://localhost:4000");
});
