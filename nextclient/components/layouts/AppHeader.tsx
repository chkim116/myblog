import React from "react"
import styled from "@emotion/styled"
import { Header } from "antd/lib/layout/layout"

const App = styled(Header)`
    background-color: #fafbfc;
`
interface AppProp {
    children: React.ReactChild
}

const AppHeader = ({ children }: AppProp) => {
    return <App>{children}</App>
}

export default AppHeader
