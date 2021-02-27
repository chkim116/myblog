import React from "react"
import styled from "@emotion/styled"
import Sider from "antd/lib/layout/Sider"

const App = styled(Sider)`
    background-color: #fafbfc;
`
interface AppProp {
    children: React.ReactChild
}

const AppSider = ({ children }: AppProp) => {
    return <App>{children}</App>
}

export default AppSider
