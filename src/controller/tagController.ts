import Post from "../models/post";
import { Request, Response } from "express";

export const getTags = async (req: Request, res: Response) => {
    try {
        const tags = await Post.find({}, { tags: true }).sort({
            _id: -1,
        });
        let tagList: string[] = [];

        tags.map((array : any ) => array.tags.map((tag:any) => tagList.push(tag)));

        const reduceTag = tagList.reduce((obj: any, current) => {
            if (!obj[current]) {
                obj[current] = 0;
            }
            obj[current]++;
            return obj;
        }, {});

        const tagsKeyValue = (Object.entries as any)(reduceTag).sort(
            (a: any, b: any) => b[1] - a[1]
        );

        res.status(200);
        res.json(tagsKeyValue.slice(0, 20));
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const getSearchingTags = async (req: Request, res: Response) => {
    const { select, tag, text } = req.query;

    try {
        let post;
        if (tag) {
            post = await Post.find({
                tags: tag as string,
            }).sort({ _id: -1 });
        }
        if (select === "title") {
            post = await Post.find({ title: { $regex: text as string } }).sort({
                _id: -1,
            });
        }
        if (select === "description") {
            post = await Post.find({
                description: { $regex: text as string },
            }).sort({
                _id: -1,
            });
        }
        if (select === "tags") {
            post = await Post.find({ tags: text as string }).sort({ _id: -1 });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(400);
        console.log(err);
    }
};
