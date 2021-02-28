import React, { useState } from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import Sider from "antd/lib/layout/Sider"
import Link from "next/link"
import { Categories } from "../../pages/[categories]"

const App = styled(Sider)<{ show?: string }>`
    background-color: #ffffff;
    padding: 1em;
    margin-top: 1em;

    ${({ show }) =>
        show === "true" &&
        css`
            position: fixed;
            right: 0;
            top: 0;
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

const getAllLength = (category: Categories[]): number => {
    let res = 0
    category.reduce((prev: number, cur: Categories) => {
        return (res = prev + cur.post.length)
    }, 0)

    return res
}

const AppSider = ({
    showSider,
    categories = [],
}: {
    showSider?: boolean
    categories: Categories[]
}) => {
    const allPost = useState(getAllLength(categories) || 0)

    return (
        <App show={showSider?.toString()}>
            <ul>
                <Link href="/">
                    <li>All ({allPost})</li>
                </Link>
                {categories.map((list) => (
                    <Link href={`/${list.category}`} key={list._id}>
                        <li>
                            {list.category} ({list.post.length})
                        </li>
                    </Link>
                ))}
            </ul>
        </App>
    )
}

export default AppSider
