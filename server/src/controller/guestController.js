import Guest from "../models/Guest";
import mongoose from "mongoose";

export const getGuest = async (req, res) => {
  try {
    const guest = await Guest.find({}).sort({ _id: -1 });
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
      creator: req.user
        ? req.user._id
        : mongoose.Types.ObjectId("4edd40c86762e0fb12000003"),
      createDate,
      username: req.user ? req.user.username : "익명",
      updata: false,
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
        updata: true,
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
