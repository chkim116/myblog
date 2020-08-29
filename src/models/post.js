import mongoose from "mongoose";

const dateNow = new Date();

const currentDate = `${dateNow.getFullYear()}-${
  dateNow.getMonth() + 1
}-${dateNow.getDate()}`;

const allDate = `${currentDate}-${
  dateNow.getHours() < 10 ? `0${dateNow.getHours()}` : `${dateNow.getHours()}`
}시${
  dateNow.getMinutes() < 10
    ? `0${dateNow.getMinutes()}`
    : `${dateNow.getMinutes()}`
}분${
  dateNow.getSeconds() < 10
    ? `0${dateNow.getSeconds()}`
    : `${dateNow.getSeconds()}`
}초`;

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "title is required",
  },
  description: {
    type: String,
    required: "description is required",
  },
  createDate: {
    type: String,
    default: allDate,
  },
});

const model = mongoose.model("Post", PostSchema);

export default model;
