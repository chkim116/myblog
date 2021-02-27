import Paragraph from "antd/lib/typography/Paragraph"
import Text from "antd/lib/typography/Text"
import Title from "antd/lib/typography/Title"
import Head from "next/head"
import styled from "@emotion/styled"
import Link from "next/link"

const ContentLayout = styled.div`
    padding-bottom: 1em;
    border-bottom: 1px dashed #dbdbdc;
    margin-bottom: 3em;
    cursor: pointer;

    .content__title {
        margin-top: 0.9em !important;
    }
`

export default function Home() {
    return (
        <>
            <Link href="/d">
                <ContentLayout>
                    <Text className="content__date">
                        {new Date().toDateString()}
                    </Text>
                    <Title className="content__title">
                        주니어 클린코드 맛보기
                    </Title>
                    <Paragraph>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Impedit non nostrum eum minus similique delectus, culpa,
                        nemo dolor quisquam est at voluptatibus molestias.
                        Excepturi repellendus odit soluta architecto ipsa eaque.
                    </Paragraph>
                </ContentLayout>
            </Link>

            <ContentLayout>
                <Text>{new Date().toDateString()}</Text>
                <Title>주니어 클린코드 맛보기</Title>
                <Paragraph>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit non nostrum eum minus similique delectus, culpa,
                    nemo dolor quisquam est at voluptatibus molestias. Excepturi
                    repellendus odit soluta architecto ipsa eaque.
                </Paragraph>
            </ContentLayout>

            <ContentLayout>
                <Text>{new Date().toDateString()}</Text>
                <Title>주니어 클린코드 맛보기</Title>
                <Paragraph>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit non nostrum eum minus similique delectus, culpa,
                    nemo dolor quisquam est at voluptatibus molestias. Excepturi
                    repellendus odit soluta architecto ipsa eaque.
                </Paragraph>
            </ContentLayout>
        </>
    )
}
