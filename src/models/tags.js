import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
  tags: [
    {
      type: String,
    },
  ],
});

const model = mongoose.model("Tags", tagsSchema);

export default model;
