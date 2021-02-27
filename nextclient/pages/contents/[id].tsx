import Title from "antd/lib/typography/Title"
import React from "react"
import styled from "@emotion/styled"
import ContentForm from "../../components/layouts/ContentForm"

const Content = styled.section`
    width: 100%;
    margin-top: 90px;
`

const ContentTitle = styled(Title)`
    padding-bottom: 0.6em;
`

const Contents = () => {
    return (
        <Content>
            <ContentForm
                date={new Date().toDateString()}
                title={"드디어 오픈 리뉴얼..!"}
                p={"<div> gg</div> <div>mfmfm</div>"}
            />
        </Content>
    )
}

export default Contents
