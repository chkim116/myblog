import Post from "../models/post";

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
