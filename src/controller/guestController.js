import Guest from "../models/Guest";

export const getGuest = async (req, res) => {
  try {
    const guest = await Guest.find({}).sort({ createDate: -1 });
    res.status(200).json(guest);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const getGuestById = async (req, res) => {
  const { id } = req.params;
  try {
    const guest = await Guest.findById(id);
    res.status(200).json(guest);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const postGuest = async (req, res) => {
  const { title, description, createDate } = req.body;
  try {
    const guest = await Guest.create({
      title,
      description,
      creator: req.user._id,
      createDate,
      username: req.user.username,
    });
    guest.save();
    res.status(200).send(guest);
  } catch (err) {
    console.log(err);
    res.status(400).send("error");
  }
};

export const guestEditing = async (req, res) => {
  const { id } = req.params;
  const { title, description, createDate, creator } = req.body;
  try {
    await Guest.findOneAndUpdate(
      { _id: id },
      {
        title,
        description,
        creator,
        updated,
        createDate,
      }
    );
    res.status(200).send(true);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
export const guestDeleting = async (req, res) => {
  const { id } = req.params;
  try {
    await Guest.findOneAndDelete({ _id: id });
    res.status(200).send(true);
  } catch (err) {
    console.log(err);
    res.status(400).send(false);
  }
};
