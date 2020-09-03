import User from "../models/User";
import passport from "passport";

export const postRegister = async (req, res, next) => {
  const {
    body: { username, email, password },
  } = req;
  try {
    const user = await User({ username, email, password, admin: false });
    await User.register(user, password);
    next();
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ message: "이미 같은 아이디 혹은 이메일이 존재합니다" });
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

// export const getLogin = async (req, res) => {
//   const { error } = loginValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const { password, username } = req.body;

//   // ID체크
//   const user = await User.findOne({ username });
//   if (!user) return res.status(400).send("ID or Password is wrong");

//   // 해쉬 비밀번호 체크
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