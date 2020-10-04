import Port from "../models/PortFolio";

export const getPort = async (req, res) => {
  try {
    const port = await Port.find({}).sort({ createDate: -1 });
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
  const { title, description, createDate, category, link } = JSON.parse(
    req.body.value
  );
  const location = req.files.map((f) => f.location);
  try {
    const port = await Port.create({
      imgUrl: location,
      title,
      description,
      createDate,
      category,
      link,
      creator: req.user._id,
    });
    port.save();
    res.status(200).send(port);
  } catch (err) {
    console.log(err);
    res.status(400).send("error");
  }
};

export const portEditing = async (req, res) => {
  const { id } = req.params;
  const { title, description, createDate, imgUrl, category, link } = req.body;
  try {
    await Port.findOneAndUpdate(
      { _id: id },
      {
        title,
        description,
        createDate,
        imgUrl,
        category,
        link,
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
