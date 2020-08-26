import Post from "../models/post";
import { routes } from "../../routes";

export const postPosting = async (req, res) => {
  const {
    body: { title, description, image },
  } = req;
  try {
    const post = await Post.create({
      title: title,
      description: description,
      image: image,
    });
    post.save();
  } catch (err) {
    console.log("에러", err);
  }
};

export const getPost = (req, res) => {
  const {
    body: { title, description },
  } = req;
  try {
    const post = title;
    console.log(post);
  } catch (err) {
    console.log(err);
  }
};
