import mongoose from "mongoose";

const PortSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "title is required",
  },
  description: {
    type: String,
    required: "description is required",
  },
  imgUrl: [
    {
      type: String,
    },
  ],
  createDate: {
    type: String,
    required: "lunching day",
  },
  category: {
    type: String,
  },
  update: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updated: String,
  link: String,
});

const model = mongoose.model("Port", PortSchema);

export default model;
