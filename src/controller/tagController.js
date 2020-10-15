import Post from "../models/post";

export const getTags = async (req, res) => {
  try {
    const tags = await Post.find({});
    res.status(200);
    res.json(tags);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const getSearchingTags = async (req, res) => {
  try {
    res.status(200);
    res.json("하이");
  } catch (err) {
    res.status(400);
    console.log(err);
  }
};
