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
      "string.alphanum": "문자와 숫자로 구성해 주세요.",
    }),
    password: Joi.string().min(6).alphanum().required().messages({
      "string.min": "비밀번호는 6자 이상입니다.",
      "string.alphanum": "문자와 숫자로 구성해 주세요.",
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
          console.log(user);
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

// 해쉬 비밀번호 체크
//   const validPass = await bcrypt.compare(password, user.password);
//   if (!validPass) return res.status(400).send("invalid password");

//   // create and assign a token
//   const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
//   res.header("auth-token", token).send(token);
// };

// export const auth = (req, res, next) => {
//   const token = req.header("auth-token");
//   if (!token) return res.status(401).send("Access Denied");
//   try {
//     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).send("invalid Token");
//   }
// };

// // 유효성 검사
// const { error } = registerValidation(req.body);
// if (error) return res.status(400).send(error.details[0].message);

// const { username, password, email } = req.body;

// // 이메일 체크
// const exist = await User.findOne({ email });
// if (exist) {
//   return res.status(400).send("Already Exist E-Mail");
// }

// // 해쉬 패스워드
// const salt = await bcrypt.genSalt(10); // hash
// const hashPassword = await bcrypt.hash(password, salt);

// try {
//   const admin = await User.create({
//     username,
//     email,
//     password: hashPassword,
//   });
//   admin.save();
//   res.send(admin);
// } catch (error) {
//   console.log(error);
// }
// next();
