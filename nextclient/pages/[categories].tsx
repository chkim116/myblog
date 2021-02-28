import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import ContentList from "../components/ContentList"
import { useRouter } from "next/router"
import AppContents from "../components/layouts/AppContents"
import { Post, AppTitle } from "."
import AppLoading from "../components/layouts/AppLoading"
import AppEmpty from "../components/layouts/AppEmpty"
import { useInfiniteScroll } from "../hooks"

interface Props {
    post: Post[]
    postCount: number
    categories: Categories[]
}

const pagePost = async (filter: string, page: number) => {
    return await axios.get(`/api?filter=${filter}&page=${page}`)
}

const Category = ({ post, postCount, categories }: Props) => {
    const router = useRouter()
    const [postList, setPostList] = useState(post)
    const [isLoading, setIsLoading] = useState(false)
    const viewPort = useRef<any>(null)

    const data = {
        viewPort: viewPort.current,
        isLoading,
        limit: Math.ceil(postCount / 6),
    }
    const [lastElement, page] = useInfiniteScroll(data)

    useEffect(() => {
        if (page <= 1) return
        setIsLoading(true)
        pagePost(router.query.categories as string, page as number).then(
            (res) => {
                setPostList([...postList, ...res.data.post])
                setIsLoading(false)
            }
        )
    }, [page])

    if (router.isFallback) {
        return <AppLoading />
    }

    if (!post) {
        return <AppEmpty />
    }

    return (
        <>
            <AppTitle>{router.query?.categories}</AppTitle>
            <AppContents categories={categories}>
                <>
                    <ContentList
                        lastElement={lastElement}
                        viewPort={viewPort}
                        postList={post}
                    ></ContentList>
                    {isLoading && <AppLoading scroll={true} />}
                </>
            </AppContents>
        </>
    )
}

export default Category

export interface Categories {
    _id?: string
    category: string
    post: any[]
}

export const getStaticPaths: GetStaticPaths = async () => {
    const categories: Categories[] = await axios
        .get("/category")
        .then((res) => res.data)

    const paths = categories.map((list) => ({
        params: { categories: list.category },
    }))
    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async (
    ctx: GetStaticPropsContext
) => {
    const category = ctx.params?.categories

    const post: Props = await axios
        .get(`/api?filter=${encodeURI(category as string)}`)
        .then((res) => res.data)

    const categories: Categories[] = await axios
        .get("/category")
        .then((res) => res.data)

    return {
        props: { post: post.post, postCount: post.postCount, categories },
        revalidate: 1,
    }
}
