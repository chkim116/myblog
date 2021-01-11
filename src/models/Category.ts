import mongoose, { Document } from "mongoose";

export interface CategoryType extends Document {
    _id?: string;
    category: string;
}

const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
    },
});

const model = mongoose.model<CategoryType>("Category", CategorySchema);

export default model;
