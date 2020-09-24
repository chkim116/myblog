import mongoose from "mongoose";

const dateNow = new Date();

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
    default: dateNow.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      hour12: false,
    }),
  },
  updated: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("Post", PostSchema);

export default model;
