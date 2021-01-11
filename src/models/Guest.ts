import mongoose, { Document } from "mongoose";

export interface GuestType extends Document {
    _id?: string;
    title: string;
    description: string;
    creator: string;
    createDate: string;
    username: string;
    updata?: boolean;
}

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

const model = mongoose.model<GuestType>("Guest", GuestSchema);

export default model;
