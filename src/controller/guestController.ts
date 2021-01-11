import Guest from "../models/Guest";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { UserType } from "../models/User";

export const getGuest = async (req: Request, res: Response) => {
    try {
        const guest = await Guest.find({}).sort({ _id: -1 });
        res.status(200).json(guest);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
};

export const getGuestById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const guest = await Guest.findById(id);
        res.status(200).json(guest);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
};

export const postGuest = async (req: Request, res: Response) => {
    const { title, description, createDate } = req.body;
    const user = req.user as UserType;
    try {
        const guest = await Guest.create({
            title,
            description,
            creator: user
                ? user.id
                : mongoose.Types.ObjectId("4edd40c86762e0fb12000003"),
            createDate,
            username: user ? user.username : "익명",
            updata: false,
        });
        guest.save();
        res.status(200).send(guest);
    } catch (err) {
        console.error(err);
        res.status(400).send("error");
    }
};

export const guestEditing = async (req: Request, res: Response) => {
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
        console.error(err);
        res.status(400).send(err);
    }
};
export const guestDeleting = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Guest.findOneAndDelete({ _id: id });
        res.status(200).send(true);
    } catch (err) {
        console.error(err);
        res.status(400).send(false);
    }
};
