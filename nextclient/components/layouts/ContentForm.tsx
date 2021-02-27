import React from "react"
import styled from "@emotion/styled"
import Text from "antd/lib/typography/Text"
import Title from "antd/lib/typography/Title"
import Paragraph from "antd/lib/typography/Paragraph"

const ContentLayout = styled.div`
    margin-bottom: 3em;
    cursor: pointer;

    .content__title {
        margin-top: 0.9em !important;
        padding-bottom: 1em;
        border-bottom: 1px dashed #dbdbdc;
    }
`

interface Props {
    date: string
    title: string
    p: string
}

const ContentForm = ({ date, title, p }: Props) => {
    return (
        <ContentLayout>
            <Text>{date}</Text>
            <Title className="content__title">{title}</Title>
            <Paragraph>
                <div dangerouslySetInnerHTML={{ __html: p }} />
            </Paragraph>
        </ContentLayout>
    )
}

export default ContentForm
