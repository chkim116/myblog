import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "title is required",
  },
  description: {
    type: String,
    required: "description is required",
  },
  createDate: String,
  updated: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tags: Array,
  category: {
    type: String,
  },
});

const model = mongoose.model("Post", PostSchema);

export default model;
