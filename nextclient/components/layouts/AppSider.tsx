import React from "react"
import styled from "@emotion/styled"
import Sider from "antd/lib/layout/Sider"

const App = styled(Sider)`
    background-color: #ffffff;
    padding: 1em;
    margin-top: 1em;
`
interface AppProp {
    children: React.ReactChild
}

const AppSider = ({ children }: AppProp) => {
    return <App>{children}</App>
}

export default AppSider
