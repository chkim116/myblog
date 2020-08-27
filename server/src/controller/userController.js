import Post from "../models/post";

export const getPost = async (req, res) => {
  const page = parseInt(req.query.page);
  console.log(req);
  try {
    const post = await Post.find({})
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10);
    res.send(post);
  } catch (error) {
    console.log(error);
  }
};

export const postPosting = async (req, res) => {
  const {
    body: { title, description },
  } = req;
  try {
    const post = await Post.create({
      title,
      description,
    });
    console.log(post);
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
