import User from "../models/User";
import passport from "passport";
import bcrypt from "bcrypt";
import Joi from "@hapi/joi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const postRegister = async (req, res, next) => {
  const {
    body: { username, email, password, password2 },
  } = req;
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
  });

  if (password !== password2) {
    return res.status(400).send({ message: "비밀번호의 정보가 다릅니다." });
  }
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0]);
  }
  const salt = await bcrypt.genSalt(10); // hash
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const user = await User({
      username,
      email,
      password: hashPassword,
      admin: false,
    });
    await User.register(user, password);
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const postlogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      res
        .status(400)
        .send({ message: "아이디나 비밀번호를 다시 입력해 주세요." });
    } else {
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET);
        user.token = token;
        user.save((err, user) => {
          if (err) {
            return res.status(400).json(err);
          }
          return res
            .cookie("x_auth", user.token, {
              maxAge: 1000 * 60 * 60 * 24 * 7,
              // httpOnly: true,
              // secure: true,
              // sameSite: "none",
            })
            .status(200)
            .json({ userId: user._id, token });
        });
      });
    }
  })(req, res, next);
};

export const auth = (req, res, next) => {
  const token = req.cookies.x_auth;
  if (token === undefined || token === "") {
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json("token decode 실패");
    }
    User.findOne({ _id: decoded.userID }, (err, user) => {
      if (err) {
        return res.json("Not found");
      }
      if (!user) {
        return res.status(400).json("token의 유저가 없습니다.");
      }
      if (user) {
        req.token = token;
        req.user = user;
      }
      next();
    });
  });
};

export const logout = (req, res) => {
  req.token = "";
  return res
    .cookie("x_auth", "", {
      // httpOnly: true,
      // secure: true,
      // sameSite: "none",
    })
    .status(200)
    .send(req.token);
};
