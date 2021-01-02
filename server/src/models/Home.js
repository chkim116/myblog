import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema({
  views: {
    type: Number,
    default: 0,
  },
  ip: [
    {
      type: String,
    },
  ],
  totalView: Number,
});

const model = mongoose.model("Home", HomeSchema);

export default model;
