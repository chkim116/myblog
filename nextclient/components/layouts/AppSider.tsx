import React, { useEffect } from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import Sider from "antd/lib/layout/Sider"
import { useRouter } from "next/router"
import Link from "next/link"

const App = styled(Sider)<{ show?: string }>`
    background-color: #ffffff;
    padding: 1em;
    margin-top: 1em;

    ${({ show }) =>
        show === "true" &&
        css`
            position: fixed;
            right: 0;
            margin-top: 90px;
        `}
    ul {
        li {
            cursor: pointer;
            font-size: 18px;
            list-style: none;
            line-height: 38px;
            color: #828282;

            &:hover {
                text-decoration: underline;
            }
        }
    }
`

const AppSider = ({ showSider }: { showSider?: boolean }) => {
    const router = useRouter()

    // TODO: /? 이럴때마다 카테고리에 해당하는 글 가져오기
    useEffect(() => {
        console.log(router.asPath)
    }, [router.asPath])

    return (
        <App show={showSider?.toString()}>
            <ul>
                <Link href="/">
                    <li>All (9)</li>
                </Link>
                <Link href="/?category=js">
                    <li>Javascript (3)</li>
                </Link>
                <Link href="/?category=react">
                    <li>React (3)</li>
                </Link>
                <Link href="/?category=node">
                    <li>Node (3)</li>
                </Link>
            </ul>
        </App>
    )
}

export default AppSider
