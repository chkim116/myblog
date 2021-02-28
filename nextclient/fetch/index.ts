import axios from "axios"
import { Post } from "../pages"

export const getCate = async () => {
    return await axios.get("/category")
}

export const postFetcher = async (data: Post) => {
    await axios.post("/api/post", data)
}

export const postDeleteFetcher = async (id: string, category: string) => {
    await axios.get(`/api/del/${id}/${category}`)
}
