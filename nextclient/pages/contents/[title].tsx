import React, { useCallback, useContext, useEffect, useState } from "react"
import styled from "@emotion/styled"
import ContentForm from "../../components/layouts/ContentForm"
import { Button, Modal, notification } from "antd"
import Link from "next/link"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import AppContents from "../../components/layouts/AppContents"
import AppSider from "../../components/layouts/AppSider"
import axios from "axios"
import { Categories } from "../[categories]"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import { Post } from ".."
import { AppContext } from "../_app"
import { getCate, postDeleteFetcher } from "../../fetch"
import { useRouter } from "next/router"
import AppLoading from "../../components/layouts/AppLoading"
import AppEmpty from "../../components/layouts/AppEmpty"

const Content = styled.section`
    width: 100%;
`

const ContentEditBtn = styled.div`
    margin-left: auto;
    width: 120px;
`

interface Props {
    post: Post
}

const Contents = ({ post }: Props) => {
    const [categories, setCategories] = useState<Categories[]>()
    const [loading, setLoading] = useState(false)
    const {
        showSider,
        user: { admin },
    } = useContext(AppContext)

    const router = useRouter()

    const handleEdit = useCallback(() => {
        router.push(`/upload?title=${post?.title}&edit=true`)
    }, [post, router])

    const handleDelete = useCallback(() => {
        Modal.confirm({
            title: "삭제여부",
            content: "게시글을 삭제합니다?",
            onOk: () =>
                postDeleteFetcher(post._id, post.category).then(() => {
                    setLoading(() => true)
                    window.location.href = `/${post.category}`
                }),
        })
    }, [post, router])

    useEffect(() => {
        if (categories) {
            return
        }

        if (showSider) {
            getCate().then((res) => setCategories(res.data))
        }
    }, [showSider])

    if (loading) {
        return <AppLoading />
    }

    if (router.isFallback) {
        return <AppLoading text={true} />
    }

    if (!post) {
        return <AppEmpty />
    }

    // TODO: 에딧, 삭제 등은 고유 아이디로 이동~
    return (
        <AppContents>
            <>
                <Content>
                    {admin && (
                        <ContentEditBtn>
                            <Button
                                type="link"
                                size="large"
                                onClick={handleEdit}
                            >
                                <EditOutlined />
                            </Button>
                            <Button
                                type="link"
                                size="large"
                                onClick={handleDelete}
                            >
                                <DeleteOutlined />
                            </Button>
                        </ContentEditBtn>
                    )}
                    <ContentForm
                        tags={post.tags}
                        date={post.createDate}
                        title={post.title}
                        p={post.description}
                    />
                </Content>
                {categories && showSider && (
                    <AppSider showSider={showSider} categories={categories} />
                )}
            </>
        </AppContents>
    )
}

export default Contents

interface AllTitles {
    title: string
}

export const getStaticPaths: GetStaticPaths = async () => {
    const allTitles: AllTitles[] = await axios
        .get("/api/all")
        .then((res) => res.data.postTitleList)

    const paths = allTitles.map((list) => {
        return { params: { title: encodeURIComponent(list.title) } }
    })

    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async (
    ctx: GetStaticPropsContext
) => {
    const { params } = ctx

    const post = await axios
        .get(`/api/${encodeURIComponent(params?.title as string)}`)
        .then((res) => res.data)

    return { props: { post }, revalidate: 1 }
}
