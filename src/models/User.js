import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 10,
    min: 6,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  admin: Boolean,
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "username",
  passwordField: "password",
});

const options = {
  errorMessages: {
    MissingPasswordError: "비밀번호를 입력하지 않았습니다.",
    IncorrectPasswordError: "비밀번호가 일치하지 않습니다.",
    IncorrectUsernameError: "아이디가 일치하지 않습니다.",
    MissingUsernameError: "유저 이름을 입력하지 않았습니다.",
    UserExistsError: "유저가 이미 존재합니다.",
  },
};

UserSchema.plugin(passportLocalMongoose, options);

const model = mongoose.model("User", UserSchema);

export default model;
