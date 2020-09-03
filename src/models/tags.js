import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
  text: String,
});

const model = mongoose.model("tags", tagsSchema);

export default model;
