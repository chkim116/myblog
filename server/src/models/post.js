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
  tags: [String],
  createDate: {
    type: Date,
    default: Date.now(),
  },
});

const model = mongoose.model("Post", PostSchema);

export default model;
