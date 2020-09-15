import Post from "../models/post.js";

export const getPost = async (req, res) => {
  const page = parseInt(req.query.page || "1");
  if (page < 1) {
    res.status(400).send("페이지 에러");
    return;
  }
  try {
    const post = await Post.find({})
      .sort({ _id: -1 })
      .limit(3)
      .skip((page - 1) * 3)
      .exec();
    const postCount = await Post.countDocuments().exec();
    res.set("Last-Page", Math.ceil(postCount / 3)).json(post);
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = async (req, res) => {
  try {
    const post = await Post.find({}).sort({ _id: -1 });
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const postPosting = async (req, res) => {
  const {
    body: { title, description, updated },
  } = req;
  try {
    const post = await Post.create({
      title,
      description,
      updated,
      creator: req.user._id,
    });
    post.save().then((post) => res.json(post));
    console.log("성공^^");
  } catch (err) {
    res.status(400);
    console.log("에러nn", err);
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const postById = await Post.findById(id);
    res.status(200).json(postById);
  } catch (err) {
    console.log(err);
  }
};

export const postEditing = async (req, res) => {
  const { id } = req.params;
  const { title, description, updated } = req.body;
  console.log(description);
  try {
    const post = await Post.findOneAndUpdate(
      { _id: id },
      { title, description, updated }
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(400).send(false);
    console.log(err);
  }
};

export const postDeleting = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findOneAndDelete({ _id: id });
    res.status(200).send(true);
  } catch (err) {
    res.status(400).send(false);
    console.log(err);
  }
};

export const getCreatorId = async (req, res) => {
  const { _id } = req.user || null;
  try {
    const post = await Post.findById(_id);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
