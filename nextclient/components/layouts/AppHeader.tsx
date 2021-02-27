import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { Header } from "antd/lib/layout/layout"

const App = styled(Header)<{ scaleheight: boolean }>`
    position: fixed;
    width: 100%;
    background-color: #ffffff;
    height: ${({ scaleheight }) => (scaleheight ? "75px" : "65px")};
    border-bottom: 1px solid #dbdbdb;
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    z-index: 300;
    transition: all 200ms;
    .header__container {
        max-width: 900px;
        width: 100%;
        margin: 0 auto;
    }
`
interface AppProp {
    children: React.ReactChild
}

const AppHeader = ({ children }: AppProp) => {
    const [scaleHeight, setScaleHeight] = useState(false)

    useEffect(() => {
        document.addEventListener("scroll", () => {
            if (window.scrollY > 75) {
                setScaleHeight(() => true)
            } else {
                setScaleHeight(() => false)
            }
        })

        return () => {
            document.removeEventListener("scoll", (_) => _)
        }
    }, [])

    return <App scaleheight={scaleHeight}>{children}</App>
}

export default AppHeader
