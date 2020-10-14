import Tags from "../models/tags";
import Post from "../models/post";
export const getTags = async (req, res) => {
  try {
    const tags = await Tags.find({});
    res.status(200);
    res.json(tags);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
