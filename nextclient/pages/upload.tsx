import React from "react"
import QuillEditor from "../components/QuillEditor"
import styled from "@emotion/styled"
import { Form, Input, Select } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { useRouter } from "next/router"
const { Item } = Form

const Container = styled.div`
    margin-top: 100px;

    .select__container {
        width: 120px;
    }

    .title__container {
        width: 500px;
        input {
            border: none;
            border-bottom: 1px solid #dbdbdb;
        }
    }

    textarea {
        margin-top: 1em;
        border: none;
    }

    .tag__container {
        margin-top: 1em;
        width: 300px;
    }
`

const Upload = () => {
    const router = useRouter()

    // edit === true 일시~ 데이터 넣어주기~
    console.log(router.query)
    return (
        <Container>
            <Form size="large" layout="inline">
                <Item className="select__container">
                    <Select
                        bordered={false}
                        style={{ borderBottom: "1px solid #dbdbdb" }}
                    >
                        <Select.Option value="1" children="g"></Select.Option>
                    </Select>
                </Item>
                <Item className="title__container">
                    <Input placeholder="제목입력" />
                </Item>
            </Form>
            <Item>
                <TextArea placeholder="미리보기 텍스트를 적어주세요." />
            </Item>
            <QuillEditor />

            <Item label="태그 작성" className="tag__container">
                <Input />
            </Item>
        </Container>
    )
}

export default Upload
