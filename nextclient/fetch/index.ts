import axios from "axios"
import { Post } from "../pages"

export const getCate = async () => {
    return await axios.get("/category")
}

export const postFetcher = async (data: Post) => {
    await axios.post("/api/post", data)
}
