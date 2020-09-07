import Port from "../models/PortFolio";

export const getPort = async (req, res) => {
  try {
    const port = await Port.find({}).sort({ _id: -1 });
    res.status(200).json(port);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
export const getPortById = async (req, res) => {
  const { id } = req.params;
  try {
    const port = await Port.findById(id);
    res.status(200).json(port);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const postPortFolio = async (req, res) => {
  const { title, description, imgUrl, createDate, category } = req.body;
  try {
    const post = await Port.create({
      title,
      description,
      imgUrl,
      createDate,
      category,
      creator: req.user._id,
    });
    post.save();
    res.status(200).send(true);
  } catch (err) {
    console.log(err);
    res.status(400).send("error");
  }
};

export const portEditing = async (req, res) => {
  const { id } = req.params;
  const { title, description, createDate, imgUrl, category } = req.body;
  try {
    await Port.findOneAndUpdate(
      { _id: id },
      {
        title,
        description,
        createDate,
        imgUrl,
        category,
      }
    );
    res.status(200).send(true);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
export const portDeleting = async (req, res) => {
  const { id } = req.params;
  try {
    await Port.findOneAndDelete({ _id: id });
    res.status(200).send(true);
  } catch (err) {
    console.log(err);
    res.status(400).send(false);
  }
};
