import Category from "../models/Category";

export const createCategory = async (req, res) => {
  const { category } = req.body;
  console.log(category);
  try {
    await Category.create({
      category: category,
    });
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.find({}).sort({});
    res.status(200).json(category);
  } catch (err) {
    res.status(400);
    console.log(err);
  }
};

export const editCategory = async (req, res) => {
  console.log(req.params);
  const { category } = req.body;
  try {
    const category = await Category.findOneAndUpdate(
      { _id: id },
      {
        category: category,
      }
    );
    Category.save();
    res.staus(200);
  } catch (err) {
    res.status(400);
    console.log(err);
  }
};

export const delCategory = async (req, res) => {
  const { id } = req.params;
  try {
  } catch (err) {
    console.log(err);
  }
};
