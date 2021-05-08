import Category from "../models/Category"
import { Request, Response } from "express"
import Post from "../models/post"

export const createCategory = async (req: Request, res: Response) => {
    const { category }: { category: string } = req.body
    try {
        await Category.create({
            category,
        })
        res.status(200).json("create!")
    } catch (err) {
        console.error(err)
        res.status(400)
    }
}

export const getCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.find({}).sort({ category: -1 })
        res.status(200).json(category)
    } catch (err) {
        res.status(400)
        console.error(err)
    }
}

export const editCategory = async (req: Request, res: Response) => {
    const {
        categoryEdit: { text, id },
    } = req.body
    try {
        await Category.findOneAndUpdate(
            { _id: id },
            {
                category: text,
            }
        )
        res.status(200)
    } catch (err) {
        res.status(400)
        console.error(err)
    }
}

export const delCategory = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const category = await Category.findById(id)
        await Category.findOneAndDelete({ _id: id })

        category?.post.forEach(async (p) => {
            await Post.findOneAndDelete({ _id: p })
        })

        res.status(200)
    } catch (err) {
        res.status(400)
        console.error(err)
    }
}
