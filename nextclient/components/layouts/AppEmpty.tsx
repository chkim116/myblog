import { Button, Empty } from "antd"
import React from "react"
import AppContents from "./AppContents"

const AppEmpty = () => {
    return (
        <AppContents>
            <div style={{ textAlign: "center", lineHeight: 10 }}>
                <Empty description="죄송하지만.. 게시글을 못불러 왔네요.."></Empty>
                <Button type="primary" onClick={() => history.back()}>
                    뒤로가기
                </Button>
            </div>
        </AppContents>
    )
}

export default AppEmpty
