import User, { UserType } from "../models/User"
import passport from "passport"
import bcrypt from "bcrypt"
import Joi from "@hapi/joi"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { CookieOptions, NextFunction, Request, Response } from "express"
dotenv.config()

const options = (login: boolean) => {
    const option: CookieOptions = {
        maxAge: login ? 1000 * 60 * 60 * 24 * 7 : 0,
        path: "/",
        domain:
            process.env.NODE_ENV === "production" ? ".kormelon.cf" : undefined,
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    }
    return option
}

export const postRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        body: { username, email, password, password2 },
    } = req
    const schema = Joi.object().keys({
        username: Joi.string().min(5).alphanum().required().messages({
            "string.min": "아이디는 5자 이상입니다.",
            "string.alphanum": "아이디는 영어와 숫자로 구성해 주세요.",
        }),
        password: Joi.string().min(6).alphanum().required().messages({
            "string.min": "비밀번호는 6자 이상입니다.",
            "string.alphanum": "비밀번호는 영어나 숫자로 구성해 주세요.",
        }),
        password2: Joi.string().min(6).alphanum().required().messages({
            "string.min": "비밀번호는 6자 이상입니다.",
        }),
        email: Joi.string().required().email(),
    })

    if (password !== password2) {
        return res.status(400).send({ message: "비밀번호의 정보가 다릅니다." })
    }
    const result = schema.validate(req.body)
    if (result.error) {
        return res.status(400).send(result.error.details[0])
    }
    const salt = await bcrypt.genSalt(10) // hash
    const hashPassword = await bcrypt.hash(password, salt)

    try {
        const user = await new User({
            username,
            email,
            password: hashPassword,
            admin: false,
        })
        await User.register(user, password)
        next()
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

export const postlogin = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return res.send("message: error")
        if (!user) {
            res.status(400).send({
                message: "아이디나 비밀번호를 다시 입력해 주세요.",
            })
            return
        } else {
            req.logIn(user, (err) => {
                if (err) {
                    return next(err)
                }
                const token = jwt.sign(
                    { userID: user._id },
                    process.env.JWT_SECRET as string
                )
                user.token = token
                user.save((err: any, user: UserType) => {
                    if (err) {
                        return res.status(400).json(err)
                    }
                    return res
                        .cookie("x_auth", user.token, options(true))
                        .status(200)
                        .json({
                            id: user._id,
                            username: user.username,
                            token: user.token,
                        })
                })
            })
        }
    })(req, res, next)
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.x_auth

    if (token === undefined || token === "") {
        return res.send({ message: "없음" })
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        (err: any, decoded: any) => {
            if (err) {
                return res.status(500).json("token decode 실패")
            }
            User.findOne(
                { _id: decoded.userID },
                (err: any, user: UserType) => {
                    if (err) {
                        return res.json("Not found")
                    }
                    if (!user) {
                        return res.status(400).json("token의 유저가 없습니다.")
                    }
                    if (user) {
                        ;(req as any).token = token
                        req.user = user
                    }
                    next()
                }
            )
        }
    )
}

export const logout = (req: Request, res: Response) => {
    ;(req as any).token = ""
    return res
        .cookie("x_auth", "", options(false))
        .status(200)
        .send((req as any).token)
}
