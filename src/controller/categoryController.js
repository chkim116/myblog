import Category from "../models/Category";

export const createCategory = async (req, res) => {
    const { category } = req.body;
    try {
        await Category.create({
            category: category,
        });
        res.status(200).json("create!");
    } catch (err) {
        console.log(err);
        res.status(400);
    }
};

export const getCategory = async (req, res) => {
    try {
        const category = await Category.find({}).sort({ category: -1 });
        res.status(200).json(category);
    } catch (err) {
        res.status(400);
        console.log(err);
    }
};

export const editCategory = async (req, res) => {
    const {
        categoryEdit: { text, id },
    } = req.body;
    try {
        await Category.findOneAndUpdate(
            { _id: id },
            {
                category: text,
            }
        );
        res.status(200);
    } catch (err) {
        res.status(400);
        console.log(err);
    }
};

export const delCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await Category.findOneAndDelete({ _id: id });
        res.status(200);
    } catch (err) {
        res.status(400);
        console.log(err);
    }
};
