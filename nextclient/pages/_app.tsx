import { AppProps } from "next/dist/next-server/lib/router/router"
import styled from "@emotion/styled"
import "../styles/index.css"
import React from "react"
import Layout, { Header, Content, Footer } from "antd/lib/layout/layout"
import AppFooter from "../components/layouts/AppFooter"
import AppHeader from "../components/layouts/AppHeader"
import AppSider from "../components/layouts/AppSider"
import { Tag } from "antd"
import Title from "antd/lib/typography/Title"

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
    return (
        <>
            <AppLayouts>
                <AppHeader>
                    <div className="header__container">개발자의 생각창고</div>
                </AppHeader>
                <AppTitle>Categories</AppTitle>
                <AppContentLayout>
                    <AppContent>
                        <Component {...pageProps} />
                    </AppContent>
                    <AppSider>Categories</AppSider>
                </AppContentLayout>
                <AppFooter>KimChanghoe &copy; 2021</AppFooter>
            </AppLayouts>
        </>
    )
}

export default MyApp
