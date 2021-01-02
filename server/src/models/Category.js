import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const model = mongoose.model("Category", CategorySchema);

export default model;
