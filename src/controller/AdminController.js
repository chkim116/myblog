import Admin from "../models/Admin";
import { registerValidation, loginValidation } from "../../validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const postRegisterAdmin = async (req, res, next) => {
  // 유효성 검사
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, password, email } = req.body;

  // 이메일 체크
  const exist = await Admin.findOne({ email });
  if (exist) {
    return res.status(400).send("Already Exist E-Mail");
  }
  // 해쉬 패스워드
  const salt = await bcrypt.genSalt(10); // hash
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const admin = await Admin.create({
      username,
      email,
      password: hashPassword,
    });
    admin.save();
    res.send(admin);
  } catch (error) {
    console.log(error);
  }
  next();
};

export const getLogin = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { password, username } = req.body;

  // ID체크
  const user = await Admin.findOne({ username });
  if (!user) return res.status(400).send("ID or Password is wrong");

  // 해쉬 비밀번호 체크
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("invalid password");

  // create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
};

export const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("invalid Token");
  }
};
