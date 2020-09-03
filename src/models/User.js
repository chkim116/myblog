import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 10,
    min: 2,
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

const model = mongoose.model("User", UserSchema);

export default model;
