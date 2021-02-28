import express from "express"
import passport from "passport"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import schedule from "node-schedule"

import "./db"
dotenv.config()

// Router

import guestRouter from "./src/routers/guestRouter"
import postRouter from "./src/routers/postRouter"
import userRouter from "./src/routers/userRouter"
import tagRouter from "./src/routers/tagRouter"
import categoryRouter from "./src/routers/categoryRouter"
import homeRouter from "./src/routers/homeRouter"

// Schema
import "./src/models/post"
import "./src/models/User"
import "./src/models/Category"
import "./src/models/Comments"
import "./src/models/Guest"
import "./src/models/Home"
import "./passport"
import "./multer"
import { totalView } from "./src/controller/homeController"

const app = express()

// middleware

app.use(helmet())
app.use(
    cors({
        origin: true,
        credentials: true,
    })
)

app.use(morgan("dev"))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())
app.use(passport.session())

app.use("/", homeRouter)
app.use("/api", postRouter)
app.use("/port", guestRouter)
app.use("/auth", userRouter)
app.use("/tag", tagRouter)
app.use("/category", categoryRouter)

app.get("/", (req, res) => {
    res.send("welcome to my blog server")
})

// 자정마다 조회수 초기화 및 토탈 추가
const views = schedule.scheduleJob("0 0 0 * * *", totalView as any)

// server
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Hello, http://localhost:${PORT}`)
})
