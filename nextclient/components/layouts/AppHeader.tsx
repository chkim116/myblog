import React, { useContext, useEffect, useState } from "react"
import styled from "@emotion/styled"
import { Header } from "antd/lib/layout/layout"
import { AppContext } from "../../context/auth"

const App = styled(Header)<{ scaleheight: string }>`
    position: fixed;
    width: 100%;
    background-color: #ffffff;
    height: ${({ scaleheight }) => (scaleheight === "true" ? "75px" : "65px")};
    border-bottom: 1px solid #dbdbdb;
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    z-index: 300;
    justify-content: space-between;

    transition: all 200ms;

    .header__container {
        max-width: 1000px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        span {
            cursor: pointer;
        }
    }

    .header__login {
        margin-right: 15px;
    }
`
interface AppProp {
    children: React.ReactChild
}

const AppHeader = ({ children }: AppProp) => {
    const [scaleHeight, setScaleHeight] = useState(false)

    const user = useContext(AppContext)
    console.log(user)

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

    return <App scaleheight={scaleHeight.toString()}>{children}</App>
}

export default AppHeader
