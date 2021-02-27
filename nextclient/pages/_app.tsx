import { AppProps } from "next/dist/next-server/lib/router/router"
import styled from "@emotion/styled"
import "../styles/index.css"
import React, { useCallback, useEffect, useState } from "react"
import Layout, { Content } from "antd/lib/layout/layout"
import AppFooter from "../components/layouts/AppFooter"
import AppHeader from "../components/layouts/AppHeader"
import AppSider from "../components/layouts/AppSider"
import Title from "antd/lib/typography/Title"
import { useRouter } from "next/router"
import { Button } from "antd"
import { MenuOutlined, CloseOutlined } from "@ant-design/icons"
import Link from "next/link"

const AppLayouts = styled(Layout)`
    width: 100%;
    background-color: #ffffff;
`

const AppContentLayout = styled(Layout)`
    width: 100%;
    background-color: #ffffff;
    max-width: 1000px;
    margin: 0 auto;
`

const AppTitle = styled(Title)`
    margin: 95px 0;
    padding: 0.75em 0 1.5em 0;
    display: flex;
    align-items: center;
    color: #5f9ea0 !important;
    justify-content: center;
    border-bottom: 1px solid #dbdbdb;
`

const AppContent = styled(Content)`
    width: 100%;
    min-height: 100vh;
    padding: 2em;
    max-width: 1000px;
    margin: 0 auto;
`

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const [showSider, setShowSider] = useState(false)

    const handleShowSider = useCallback(() => {
        setShowSider((prev) => !prev)
    }, [])

    return (
        <>
            <AppLayouts>
                <AppHeader>
                    <>
                        <Link href="/">
                            <div className="header__container">
                                <span>개발자의 생각창고</span>
                            </div>
                        </Link>
                        <div className="header__login">
                            <Link href="/login">
                                <Button type="link" size="large">
                                    Login
                                </Button>
                            </Link>
                        </div>
                        {router.pathname !== "/" && (
                            <Button
                                type="ghost"
                                style={{ position: "absolute", right: "20px" }}
                                size="large"
                                onClick={handleShowSider}
                            >
                                {showSider ? (
                                    <CloseOutlined />
                                ) : (
                                    <MenuOutlined />
                                )}
                            </Button>
                        )}
                    </>
                </AppHeader>
                {router.pathname === "/" && (
                    <AppTitle>{router.query?.category || "all"}</AppTitle>
                )}
                <AppContentLayout>
                    <AppContent>
                        <Component {...pageProps} />
                    </AppContent>
                    {router.pathname === "/" && <AppSider />}
                    {showSider && router.pathname !== "/" && (
                        <AppSider showSider={showSider} />
                    )}
                </AppContentLayout>
                <AppFooter>KimChanghoe &copy; 2021</AppFooter>
            </AppLayouts>
        </>
    )
}

export default MyApp
