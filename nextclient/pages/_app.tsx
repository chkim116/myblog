import { AppProps } from "next/dist/next-server/lib/router/router"
import styled from "@emotion/styled"
import "../styles/index.css"
import React from "react"
import Layout, { Header, Content, Footer } from "antd/lib/layout/layout"
import AppFooter from "../components/layouts/AppFooter"
import AppHeader from "../components/layouts/AppHeader"
import AppSider from "../components/layouts/AppSider"

const AppLayout = styled(Content)`
    width: 100%;
    min-height: 100vh;
    background-color: #fafbfc;
`

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <AppHeader>Header</AppHeader>
            <Layout>
                <AppLayout>
                    <Component {...pageProps} />
                </AppLayout>
                <AppSider>Sider</AppSider>
            </Layout>
            <AppFooter>KimChanghoe &copy; 2021</AppFooter>
        </Layout>
    )
}

export default MyApp
