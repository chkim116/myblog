import User from "../models/User";
import passport from "passport";
import bcrypt from "bcrypt";
import Joi from "@hapi/joi";

export const postRegister = async (req, res, next) => {
  const {
    body: { username, email, password, password2 },
  } = req;
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(6).required().messages({
      "string.min": "아이디는 6자 이상입니다.",
      "string.alphanum": "아이디는 문자와 숫자로 구성해 주세요.",
    }),
    password: Joi.string().min(6).alphanum().required().messages({
      "string.min": "비밀번호는 6자 이상입니다.",
      "string.alphanum": "비밀번호는 문자와 숫자로 구성해 주세요.",
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
        } else {
          return res.send(true);
        }
      });
    }
  })(req, res, next);
};

export const auth = async (req, res, next) => {
  const loggedUser = (await req.user) || null;
  if (!loggedUser) {
    res.send(false);
  } else {
    const { _id, username, admin } = loggedUser;
    const user = {
      id: _id,
      username,
      admin,
    };
    res.send(user);
  }
};

export const logout = (req, res) => {
  try {
    req.logout();
    res.status(200).send(true);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};
