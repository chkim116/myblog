import Post from "../models/post.js";

export const getPost = async (req, res) => {
  try {
    const post = await Post.find({}).sort({ _id: -1 });
    res.send(post);
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
    post.save().then((post) => res.send(post));
    console.log("성공^^");
  } catch (err) {
    res.status(500);
    console.log("에러nn", err);
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const postById = await Post.findById(id);
    res.status(200).send(postById);
  } catch (err) {
    console.log(err);
  }
};

export const postEditing = async (req, res) => {
  const { id } = req.params;
  const { title, description, updated } = req.body;
  try {
    await Post.findOneAndUpdate({ _id: id }, { title, description, updated });
    res.status(200).send(true);
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
    res.status(200).send(post);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
