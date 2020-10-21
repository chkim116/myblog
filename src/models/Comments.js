import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({
  comment: String,
  creator: String,
  createDate: String,
});

const model = mongoose.model("Comments", CommentsSchema);

export default model;
