import React, { useContext, useEffect, useState } from "react"
import styled from "@emotion/styled"
import ContentForm from "../../components/layouts/ContentForm"
import { Button } from "antd"
import Link from "next/link"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { AppContext } from "../_app"
import AppContents from "../../components/layouts/AppContents"
import AppSider from "../../components/layouts/AppSider"
import axios from "axios"
import { Categories } from "../[categories]"

const Content = styled.section`
    width: 100%;
    margin-top: 90px;
`

const ContentEditBtn = styled.div`
    margin-left: auto;
    width: 120px;
`

const getCate = async () => {
    return await axios.get("/category")
}

const Contents = () => {
    const { showSider } = useContext(AppContext)
    const [categories, setCategories] = useState<Categories[]>()

    useEffect(() => {
        if (categories) {
            return
        }

        if (showSider) {
            getCate().then((res) => setCategories(res.data))
        }
    }, [showSider])

    // TODO: 에딧, 삭제 등은 고유 아이디로 이동~
    return (
        <AppContents>
            <>
                <Content>
                    <ContentEditBtn>
                        <Link href="/upload/?edit=true">
                            <Button type="link" size="large">
                                <EditOutlined />
                            </Button>
                        </Link>
                        <Button type="link" size="large">
                            <DeleteOutlined />
                        </Button>
                    </ContentEditBtn>
                    <ContentForm
                        date={new Date().toDateString()}
                        title={"드디어 오픈 리뉴얼..!"}
                        p={"<div> gg</div> <div>mfmfm</div>"}
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
