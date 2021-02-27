import { Tag } from "antd"
import Paragraph from "antd/lib/typography/Paragraph"
import Text from "antd/lib/typography/Text"
import Title from "antd/lib/typography/Title"
import Link from "antd/lib/typography/Link"
import React from "react"
import { Post } from "../pages"
import styled from "@emotion/styled"

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

const ContentList = ({ postList }: { postList: Post[] }) => {
    return (
        <div>
            {postList.map((post) => (
                <Link href={`/contents/${post.title}`} key={post._id}>
                    <ContentLayout>
                        <Text>{post.createDate}</Text>
                        <Title className="content__title">{post.title}</Title>
                        <Paragraph>{post.preview}</Paragraph>
                        {post.tags.map((tag) => (
                            <Link href={`/search/${tag}`} key={tag}>
                                <Tag color="processing">{tag}</Tag>
                            </Link>
                        ))}
                    </ContentLayout>
                </Link>
            ))}
        </div>
    )
}

export default ContentList
