import Post from "../models/post";

export const postPosting = async (req, res) => {
  const {
    body: { title, description },
  } = req;
  try {
    const post = await Post.create({
      title: title,
      description: description,
    });
    post.save();
    res.json(post);
    console.log("성공^^");
  } catch (err) {
    console.log("에러nn", err);
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.find({}).sort({ _id: -1 });
    res.render("index", { post });
  } catch (error) {
    console.log(error);
  }
};
