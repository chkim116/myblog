import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
  name: String,
  password: Number,
});

const model = mongoose.model("Admin", AdminSchema);

export default model;
