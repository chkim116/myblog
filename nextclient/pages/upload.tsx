import React, { useCallback, useEffect, useRef, useState } from "react"
import QuillEditor from "../components/QuillEditor"
import styled from "@emotion/styled"
import { Button, Form, Input, Modal, notification, Select, Tag } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { useRouter } from "next/router"
import { getCate, postFetcher } from "../fetch"
import { Categories } from "./[categories]"
import { Post } from "."
const { Item } = Form

const Container = styled.div`
    margin: 120px auto 0 auto;
    max-width: 1000px;

    .upload__header {
        display: flex;
    }

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

const TagForm = styled.div`
    display: flex;
    align-items: center;

    button {
        margin-bottom: 10px;
        margin-left: 12px;
    }
`

interface FormValues {
    title: string
    category: string
    tags: string
    preview: string
}

const Upload = () => {
    const router = useRouter()
    const [uploadForm] = Form.useForm()
    const [form, setForm] = useState<FormValues>()
    const [desc, setDesc] = useState<string>("")
    const [tags, setTags] = useState<string[]>([])

    const tagInput = useRef<any>()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<Categories[]>([])

    const handleFormChange = useCallback((_: any, all: any) => {
        setForm(() => all)
    }, [])

    const handleQuillChange = useCallback((values: any) => {
        setDesc(() => values)
    }, [])

    // edit === true 일시~ 데이터 넣어주기~

    const handleTags = useCallback(() => {
        if (form?.tags) {
            const { tags: tag } = form
            setTags(() => [...tags, tag])
            uploadForm.setFieldsValue({ tags: "" })
        }
    }, [form])

    const handleDeleteTags = useCallback(
        (e) => {
            setTags(tags.filter((tag) => tag !== e.target.innerText))
        },
        [tags]
    )

    const handleFinish = useCallback(() => {
        setLoading(() => true)

        if (!form?.title && !form?.category && desc === "") {
            setLoading(() => false)
            return notification.error({
                message: "다 입력해 주세요",
                placement: "bottomLeft",
            })
        }

        const data = {
            ...form,
            tags,
            description: desc,
            createDate: new Date().toDateString(),
        }

        postFetcher(data as Post)
            .then(() => {
                setLoading(() => false)
                notification.success({
                    message: "게시완료",
                    placement: "bottomLeft",
                })
                return router.push(`/${form?.category}`)
            })
            .catch((e) => {
                console.error(e)
                setLoading(() => false)
                return notification.error({
                    message: "다 입력해 주세요",
                    placement: "bottomLeft",
                })
            })
    }, [desc, form])

    useEffect(() => {
        getCate().then((res) => setCategories(res.data || []))
    }, [])

    return (
        <Container>
            <Form
                size="large"
                form={uploadForm}
                name="form"
                layout="horizontal"
                onValuesChange={handleFormChange}
            >
                <div className="upload__header">
                    <Item
                        name="category"
                        className="select__container"
                        required
                    >
                        <Select
                            bordered={false}
                            style={{ borderBottom: "1px solid #dbdbdb" }}
                        >
                            {categories.map((list) => (
                                <Select.Option
                                    key={list.category}
                                    value={list.category}
                                    children={list.category}
                                ></Select.Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className="title__container" name="title" required>
                        <Input placeholder="제목입력" />
                    </Item>
                </div>

                <Item name="preview">
                    <TextArea placeholder="미리보기 텍스트를 적어주세요." />
                </Item>

                <QuillEditor handleQuillChange={handleQuillChange} />

                {tags.map((tag) => (
                    <Tag key={tag} onClick={handleDeleteTags}>
                        {tag}
                    </Tag>
                ))}
                <TagForm>
                    <Item
                        name="tags"
                        label="태그 작성"
                        className="tag__container"
                    >
                        <Input
                            ref={tagInput}
                            placeholder="태그를 입력하세요."
                        />
                    </Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleTags}
                    >
                        입력
                    </Button>
                </TagForm>
            </Form>

            <Button
                onClick={handleFinish}
                loading={loading}
                type="primary"
                htmlType="submit"
            >
                확인
            </Button>
        </Container>
    )
}

export default Upload
