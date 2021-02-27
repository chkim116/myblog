import styled from "@emotion/styled"
import { Tag } from "antd"
import Paragraph from "antd/lib/typography/Paragraph"
import Text from "antd/lib/typography/Text"
import Title from "antd/lib/typography/Title"
import Link from "next/link"
import React from "react"

const ContentLayout = styled.div`
    padding-bottom: 1em;
    border-bottom: 1px dashed #dbdbdc;
    margin-bottom: 3em;
    cursor: pointer;

    .content__title {
        margin-top: 0.9em !important;
    }

    .ant-tag {
        &:hover {
            text-decoration: underline;
        }
    }
`
const routes = [1, 2, 3, 4, 5]

export default function Home() {
    return (
        <>
            {routes.map((id) => (
                <Link href={`/contents/${id}`} key={id}>
                    <ContentLayout>
                        <Text>{new Date().toDateString()}</Text>
                        <Title className="content__title">
                            주니어 클린코드
                        </Title>
                        <Paragraph>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Corrupti animi sapiente autem natus
                            consequatur ratione aliquam odit qui quisquam
                            molestias laboriosam perferendis quibusdam non
                            dolores dolorem, in blanditiis totam? Sapiente.
                        </Paragraph>
                        <>
                            <Link href="/tag">
                                <Tag color="processing">태그1</Tag>
                            </Link>
                            <Link href="/tag">
                                <Tag color="processing">태그2</Tag>
                            </Link>
                            <Link href="/tag">
                                <Tag color="processing">태그3</Tag>
                            </Link>
                        </>
                    </ContentLayout>
                </Link>
            ))}
        </>
    )
}
