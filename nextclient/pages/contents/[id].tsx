import Title from "antd/lib/typography/Title"
import React from "react"
import styled from "@emotion/styled"
import ContentForm from "../../components/layouts/ContentForm"
import { Button } from "antd"
import Link from "next/link"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"

const Content = styled.section`
    width: 100%;
    margin-top: 90px;
`

const ContentEditBtn = styled.div`
    margin-left: auto;
    width: 120px;
`

const Contents = () => {
    return (
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
    )
}

export default Contents
