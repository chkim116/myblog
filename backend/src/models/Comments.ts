import mongoose, { Document } from "mongoose";

export interface CommentType extends Document {
    _id?: string;
    comment: string;
    creator: string;
    createDate: string;
}

const CommentsSchema = new mongoose.Schema({
    comment: String,
    creator: String,
    createDate: String,
});

const model = mongoose.model<CommentType>("Comments", CommentsSchema);

export default model;
