import { GetStaticProps } from "next"
import React, { useEffect, useState } from "react"
import axios from "axios"
import ContentList from "../components/ContentList"
import { Categories } from "./[categories]"
import Title from "antd/lib/typography/Title"
import AppContents from "../components/layouts/AppContents"
import styled from "@emotion/styled"

export const AppTitle = styled(Title)`
    margin: 95px 0;
    padding: 0.75em 0 1.5em 0;
    display: flex;
    align-items: center;
    color: #5f9ea0 !important;
    justify-content: center;
    border-bottom: 1px solid #dbdbdb;
`

export interface Post {
    _id: string
    title: string
    preview: string
    description: string
    createDate: string
    updated?: string
    creator?: string
    tags: string[]
    category: string
}

export interface Props {
    post: Post[]
    postCount: number
    categories: Categories[]
}

export default function Home({ post, postCount, categories }: Props) {
    const [postList, setPostList] = useState<Post[]>([])
    const [page, setPage] = useState(0)

    useEffect(() => {
        setPostList(post || [])
        setPage(postCount || 0)
    }, [post])

    return (
        <>
            <AppTitle>all</AppTitle>
            <AppContents categories={categories}>
                <ContentList postList={postList}></ContentList>
            </AppContents>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const post: Props = await axios.get("/api").then((res) => res.data)
    const categories: Categories[] = await axios
        .get("/category")
        .then((res) => res.data)

    return {
        props: {
            post: post.post,
            postCount: post.postCount,
            categories,
        },
        revalidate: 1,
    }
}
