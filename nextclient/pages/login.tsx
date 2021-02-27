import { Button, Form, Input } from "antd"
import React from "react"
import styled from "@emotion/styled"

const FormLayout = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
`

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 24,
    },
}

const Login = () => {
    return (
        <FormLayout {...layout} layout="horizontal" size="large">
            <Form.Item
                label="Id"
                style={{ width: "300px" }}
                rules={[
                    {
                        required: true,
                        message: "아이디를 입력해 주세요!",
                    },
                ]}
            >
                <Input placeholder="아이디" />
            </Form.Item>
            <Form.Item
                label="Password"
                style={{ width: "300px" }}
                rules={[
                    {
                        required: true,
                        message: "비밀번호를 입력해 주세요!",
                    },
                ]}
            >
                <Input placeholder="비밀번호" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    확인
                </Button>
            </Form.Item>
        </FormLayout>
    )
}

export default Login
