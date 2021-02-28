import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import React from "react"
import axios from "axios"
import ContentList from "../components/ContentList"
import { useRouter } from "next/router"
import AppContents from "../components/layouts/AppContents"
import { Post, AppTitle } from "."
import AppLoading from "../components/layouts/AppLoading"
import AppEmpty from "../components/layouts/AppEmpty"

interface Props {
    post: Post[]
    postCount: number
    categories: Categories[]
}

const Category = ({ post, postCount, categories }: Props) => {
    const router = useRouter()

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
                    <ContentList postList={post}></ContentList>
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
        .get(`/api/?filter=${encodeURI(category as string)}`)
        .then((res) => res.data)

    const categories: Categories[] = await axios
        .get("/category")
        .then((res) => res.data)

    return {
        props: { post: post.post, postCount: post.postCount, categories },
        revalidate: 1,
    }
}
