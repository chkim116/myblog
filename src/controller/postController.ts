import { Request, Response } from "express";
import Post, { PostType } from "../models/post";
import Comments from "../models/Comments";
import { UserType } from "../models/User";

export const getPost = async (req: Request, res: Response) => {
    const { filter, page }: any = req.query;
    const pageNumber = parseInt(page || "1");

    if (pageNumber < 1) {
        res.status(400).send("페이지 에러");
        return;
    }
    try {
        const post = await Post.find(
            filter ? { category: decodeURI(filter) } : {}
        )
            .sort({ _id: -1 })
            .limit(6)
            .skip((pageNumber - 1) * 6)
            .exec();
        const postCount = await Post.countDocuments(
            filter ? { category: filter } : {}
        ).exec();
        res.json({ post, postCount });
    } catch (error) {
        console.error(error);
    }
};

export const getAllPost = async (req: Request, res: Response) => {
    try {
        const post = await Post.find({}).sort({ _id: -1 });
        res.json(post);
    } catch (error) {
        console.error(error);
    }
};

export const postPosting = async (req: Request, res: Response) => {
    const {
        body: { title, description, updated, createDate, tags, category },
    }: { body: PostType } = req;
    const id = (req.user as UserType)?._id as string;
    try {
        const post = await Post.create({
            title,
            description,
            updated,
            createDate,
            creator: id,
            tags: tags,
            category,
        });
        post.save();
        res.json(true);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.json(false);
    }
};

export const getPostById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const postById = await Post.findById(id).populate("comment");
        res.status(200).json(postById);
    } catch (err) {
        console.error(err);
    }
};

export const postEditing = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, updated, tags, category }: PostType = req.body;
    try {
        const post = await Post.findOneAndUpdate(
            { _id: id },
            { title, description, updated, tags, category }
        );
        res.status(200).json(post);
    } catch (err) {
        res.status(400).send(false);
        console.error(err);
    }
};

export const postDeleting = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Post.findOneAndDelete({ _id: id });
        res.status(200).send(true);
    } catch (err) {
        res.status(400).send(false);
        console.error(err);
    }
};

export const postComments = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        comment: { comment },
        createDate,
    } = req.body;
    try {
        const post = await Post.findById(id);
        const comments = await Comments.create({
            comment: comment as string,
            creator: req.user ? (req.user as UserType).username : "익명",
            createDate: createDate,
        });
        if (post && comments) {
            post.comment?.push(comments);
            post.save();
            res.status(200).json(comments);
        }
    } catch (err) {
        res.status(400);
        console.error(err);
    }
};

export const delComments = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Comments.findOneAndDelete({ _id: id });
        res.status(200);
    } catch (err) {
        res.status(400);
        console.error(err);
    }
};

export const postImg = (req: Request, res: Response) => {
    const { file } = req;
    const location = (file as any).location;
    try {
        res.status(200).json(location);
    } catch (err) {
        console.error(err);
        res.status(400).json(err.message);
    }
};
