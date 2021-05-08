import mongoose, { Document } from "mongoose";

export interface ViewType extends Document {
    views: number;
    ip: string[];
    totalView?: number;
}

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

const model = mongoose.model<ViewType>("Home", HomeSchema);

export default model;
