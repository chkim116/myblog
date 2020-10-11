import mongoose from "mongoose";

const GuestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "title is required",
  },
  description: {
    type: String,
    required: "description is required",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createDate: String,
  username: String,
  updata: Boolean,
});

const model = mongoose.model("Guest", GuestSchema);

export default model;
